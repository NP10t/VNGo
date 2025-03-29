package com.group1.VNGo.dto.request;

import com.group1.VNGo.entity.Booking;
import com.group1.VNGo.entity.User;
import com.group1.VNGo.enums.PaymentMethod;
import com.group1.VNGo.enums.PaymentStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentCreationRequest {

    @NotNull
    private User user;

    @NotNull
    private Booking booking;

    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotNull
    private PaymentMethod paymentMethod;

    @NotNull
    private PaymentStatus status;
}
