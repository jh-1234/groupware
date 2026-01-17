package com.project.groupware.service;

import com.project.groupware.dto.JwtTokenDTO;
import com.project.groupware.dto.LoginDTO;
import com.project.groupware.dto.SessionDTO;
import com.project.groupware.entity.Employee;
import com.project.groupware.repository.EmployeeRepository;
import com.project.groupware.security.CustomUserDetails;
import com.project.groupware.security.jwt.JwtProvider;
import com.project.groupware.utils.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import tools.jackson.databind.ObjectMapper;

import java.time.Duration;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;

    private final EmployeeService employeeService;

    private final EmployeeRepository memberRepository;

    private final JwtProvider jwtProvider;

    private final StringRedisTemplate redisTemplate;

    private final ObjectMapper objectMapper;

    public JwtTokenDTO login(LoginDTO dto) {
        Employee employee = memberRepository.login(dto.getUsername()).orElseThrow(() -> new CustomException("일치하는 회원 정보가 없습니다."));

        if (!passwordEncoder.matches(dto.getPassword(), employee.getPassword())) {
            throw new CustomException("일치하는 회원 정보가 없습니다.");
        }

        String accessToken = jwtProvider.getAccessToken(employee);
        String refreshToken = jwtProvider.getRefreshToken(employee);

        SessionDTO session = SessionDTO.from(employee)
                .toBuilder()
                .refreshToken(refreshToken)
                .build();

        String sessionJson = objectMapper.writeValueAsString(session);

        redisTemplate.opsForValue().set("SESSION:" + session.empId(), sessionJson, Duration.ofDays(7));

        return JwtTokenDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public String reissue(String refreshToken) {
        if (!jwtProvider.validateToken(refreshToken)) {
            throw new CustomException("로그인 정보가 유효하지 않습니다. 다시 로그인 해주세요.");
        }

        Long empId = jwtProvider.getEmpId(refreshToken);

        String sessionJson = redisTemplate.opsForValue().get("SESSION:" + empId);

        if (!StringUtils.hasText(sessionJson)) {
            throw new CustomException("세션이 만료되었습니다.");
        }

        SessionDTO session = objectMapper.readValue(sessionJson, SessionDTO.class);

        if (!session.refreshToken().equals(refreshToken)) {
            // 토큰이 서로 다르다면 토큰 탈취 의심 -> 기존 토큰 삭제
            redisTemplate.delete("SESSION:" + empId);

            throw new CustomException("유효하지 않은 요청입니다. 다시 로그인 해주세요.");
        }

        Employee employee = employeeService.getActiveEmployee(empId).orElseThrow();
        String newAccessToken = jwtProvider.getAccessToken(employee);
        String newRefreshToken = jwtProvider.getRefreshToken(employee);

        // 갑자기 로그아웃 되지 않도록 refresh token 도 같이 연장
        session.toBuilder()
                .refreshToken(newRefreshToken)
                .build();

        redisTemplate.opsForValue().set("SESSION:" + session.empId(), objectMapper.writeValueAsString(session), Duration.ofDays(7));

        return newAccessToken;
    }

    public void logout(CustomUserDetails userDetails) {
        Long empId = userDetails.session().empId();

        redisTemplate.delete("SESSION:" + empId);
    }
}
