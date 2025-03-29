package com.group1.VNGo.entity;

import com.group1.VNGo.enums.VoucherStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vouchers")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "discount_type", nullable = false, length = 20)
    private String discountType;

    @Column(name = "discount_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal discountAmount;

    @Column(name = "min_booking_amount", precision = 10, scale = 2)
    private BigDecimal minBookingAmount;

    @Column(name = "max_discount_amount", precision = 10, scale = 2)
    private BigDecimal maxDiscountAmount;

    @Column(name = "valid_from", nullable = false)
    private LocalDateTime validFrom;

    @Column(name = "valid_to", nullable = false)
    private LocalDateTime validTo;

    @Column(name = "usage_limit")
    private Integer usageLimit;

    @Column(name = "usage_count", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer usageCount = 0;

//    @ManyToOne
//    @JoinColumn(name = "status")
    @Enumerated(EnumType.STRING)
    private VoucherStatus status;  // Trạng thái voucher (e.g., ACTIVE, INACTIVE, EXPIRED)

//    @Enumerated(EnumType.STRING)
//    @Column(name = "status", nullable = false, length = 20)
//    private VoucherStatus status;
}