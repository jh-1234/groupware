package com.project.groupware.security.jwt;

import com.project.groupware.entity.Employee;
import com.project.groupware.entity.File;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtProvider {

    private final SecretKey secretKey;

    private final Long accessTokenExpiration;

    private final Long refreshTokenExpiration;

    public JwtProvider(
            @Value("${jwt.secret.key}") String secretKey,
            @Value("${jwt.access-token.expiration}") Duration accessTokenExpiration,
            @Value("${jwt.refresh-token.expiration}") Duration refreshTokenExpiration
    ) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiration = accessTokenExpiration.toMillis();
        this.refreshTokenExpiration = refreshTokenExpiration.toMillis();
    }

    public String getAccessToken(Employee employee) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()
                .subject(String.valueOf(employee.getEmpId()))
                .claim("name", employee.getEmpName())
                .claim("profileUrl", Optional.ofNullable(employee.getProfile()).map(File::getFileLoadPath).orElse(null))
                .issuedAt(now)
                .expiration(validity)
                .signWith(this.secretKey, Jwts.SIG.HS512)
                .compact();
    }

    public String getRefreshToken(Employee employee) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshTokenExpiration);

        return Jwts.builder()
                .subject(String.valueOf(employee.getEmpId()))
                .issuedAt(now)
                .expiration(validity)
                .signWith(this.secretKey, Jwts.SIG.HS512)
                .compact();
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(this.secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Long getEmpId(String token) {
        String subject = getClaims(token).getSubject();

        return Long.parseLong(subject);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(this.secretKey)
                    .build()
                    .parseSignedClaims(token);

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
