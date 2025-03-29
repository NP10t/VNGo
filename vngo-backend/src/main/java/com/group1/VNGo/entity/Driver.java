package com.group1.VNGo.entity;

import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.group1.VNGo.enums.AccountStatus;
import com.group1.VNGo.enums.VehicleType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@SuperBuilder
@Table(name = "drivers")
@JsonNaming()
public class Driver extends BaseAccount implements UserDetails {
    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "vehicle_type")
    private VehicleType vehicleType;

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "identity_card_number")
    private String identityCardNumber;

    @Column(name = "rating_avg")
    private Double ratingAvg;

    @Column(name = "total_trips")
    private Integer totalTrips;

    @Column(name = "total_earnings")
    private Double totalEarnings;

    @Column(name = "working_status")
    private Boolean workingStatus;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_DRIVER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return phoneNumber;
    }
}
