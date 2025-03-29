package com.group1.VNGo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@SuperBuilder
@Table(name = "driver_wallets")
public class DriverWallet {

    @Id
    @Column(name = "driver_id")
    private String driverId;

//    @OneToOne
//    @MapsId // Sử dụng `driverId` như khóa chính và khóa ngoại
//    @JoinColumn(name = "driver_id", referencedColumnName = "id")
//    private Driver driver;

    @Column(nullable = false, precision = 10, scale = 2, columnDefinition = "DECIMAL(10,2) DEFAULT 0.00")
    private BigDecimal balance = BigDecimal.ZERO;
}
