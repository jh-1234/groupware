package com.project.groupware.controller;

import com.project.groupware.dto.JwtTokenDTO;
import com.project.groupware.dto.LoginDTO;
import com.project.groupware.security.CustomUserDetails;
import com.project.groupware.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequiredArgsConstructor
public class AuthController {

    @Value("${jwt.refresh-token.expiration}")
    private Duration refreshTokenExpiration;

    private final AuthService authService;

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO dto, HttpServletResponse response) {
        JwtTokenDTO token = authService.login(dto);

        long maxAge = dto.getIsRememberMe() ? refreshTokenExpiration.toMillis() : -1;

        ResponseCookie cookie = ResponseCookie.from("refreshToken", token.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(maxAge)
                .sameSite("Lax")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(token.getAccessToken());
    }

    @PostMapping("/api/reissue")
    public ResponseEntity<String> reissue(@CookieValue("refreshToken") String refreshToken) {
        String newAccessToken = authService.reissue(refreshToken);

        return ResponseEntity.ok(newAccessToken);
    }

    @PostMapping("/api/logout")
    public ResponseEntity<HttpStatus> logout(@AuthenticationPrincipal CustomUserDetails userDetails) {
        authService.logout(userDetails);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
