package com.group1.VNGo.configuration;

import com.group1.VNGo.entity.Admin;
import com.group1.VNGo.entity.User;
import com.group1.VNGo.enums.AccountStatus;
import com.group1.VNGo.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@RequiredArgsConstructor
@Configuration
@Slf4j
public class ApplicationInitConfig {

    private final PasswordEncoder passwordEncoder;

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver"
    )
    ApplicationRunner applicationRunner(AdminRepository adminRepository) {
        return args ->{
            if (adminRepository.findByPhoneNumber("0944968352").isEmpty()) {
                Admin admin = Admin.builder()
                        .phoneNumber("0944968352")
                        .password(passwordEncoder.encode("12345678"))
                        .accountStatus(AccountStatus.ACTIVE)
                        .dateOfBirth(LocalDate.now())
                        .fullName("admin")
                        .build();
                adminRepository.save(admin);
                log.warn("admin has been created with default password: 12345678, please change it");
            }
        };
    }
}
