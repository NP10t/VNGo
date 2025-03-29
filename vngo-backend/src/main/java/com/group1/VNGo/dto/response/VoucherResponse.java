package com.group1.VNGo.dto.response;

import com.group1.VNGo.enums.VoucherStatus;
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
public class VoucherResponse {
    private Long id;
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
    private String status;
}