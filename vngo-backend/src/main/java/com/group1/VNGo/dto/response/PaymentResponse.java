package com.group1.VNGo.dto.response;

import com.group1.VNGo.entity.Booking;
import com.group1.VNGo.entity.User;
import com.group1.VNGo.enums.PaymentMethod;
import com.group1.VNGo.enums.PaymentStatus;
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
public class PaymentResponse {
    private User user;
    private Booking booking;
    private BigDecimal amount;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
}
