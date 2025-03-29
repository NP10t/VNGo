package com.group1.VNGo.entity;

import com.group1.VNGo.enums.AccountStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
@SuperBuilder
public class BaseAccount extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected String id;

    @Column(name = "phone_number", unique = true, nullable = false)
    protected String phoneNumber;

    @Column(name = "password", nullable = false)
    protected String password;

    @Column(name = "full_name", nullable = false)
    protected String fullName;

    @Column(name = "date_of_birth")
    protected LocalDate dateOfBirth;

    @Column(name = "account_status")
    protected AccountStatus accountStatus;

}
