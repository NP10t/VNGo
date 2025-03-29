package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.AuthenticationRequest;
import com.group1.VNGo.dto.request.IntrospectRequest;
import com.group1.VNGo.dto.response.AuthenticationResponse;
import com.group1.VNGo.dto.response.IntrospectResponse;
import com.group1.VNGo.exception.AppException;
import com.group1.VNGo.exception.ErrorCode;
import com.group1.VNGo.repository.AdminRepository;
import com.group1.VNGo.repository.DriverRepository;
import com.group1.VNGo.repository.InvalidatedTokenRepository;
import com.group1.VNGo.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
@Data
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final DriverRepository driverRepository;
    private final AdminRepository adminRepository;
    private final JwtService jwtService;

    private final InvalidatedTokenRepository invalidatedTokenRepository;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        UserDetails userDetails = switch (request.getUserType().toUpperCase()) {
            case "USER" -> userRepository.findByPhoneNumber(request.getPhoneNumber())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            case "DRIVER" -> driverRepository.findByPhoneNumber(request.getPhoneNumber())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            case "ADMIN" -> adminRepository.findByPhoneNumber(request.getPhoneNumber())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            default -> throw new IllegalArgumentException("Invalid user type");
        };

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        boolean authenticated = passwordEncoder.matches(request.getPassword(), userDetails.getPassword());
        if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

        String token = jwtService.generateToken(userDetails);
        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;
        try {
            jwtService.verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }
        return IntrospectResponse.builder().valid(isValid).build();
    }
}
