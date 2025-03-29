package com.group1.VNGo.dto.request;

import com.group1.VNGo.dto.response.VoucherResponse;
import com.group1.VNGo.enums.VoucherStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VoucherRequest {
    private String code;
    private String title;
    private String description;
    private String discountType;
    private BigDecimal discountAmount;
    private BigDecimal minBookingAmount;
    private BigDecimal maxDiscountAmount;
    private LocalDateTime validFrom;
    private LocalDateTime validTo;
    private Integer usageLimit;
    private Integer usageCount;
    @Enumerated(EnumType.STRING)
    private VoucherStatus status;
}
