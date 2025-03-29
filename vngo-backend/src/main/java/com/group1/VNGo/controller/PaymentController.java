package com.group1.VNGo.controller;

import com.group1.VNGo.dto.request.PaymentCreationRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.PaymentResponse;
import com.group1.VNGo.service.PaymentService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {

    PaymentService paymentService;

    @PostMapping
    public ApiResponse<PaymentResponse> createPayment(@RequestBody @Valid PaymentCreationRequest request) {
        return ApiResponse.<PaymentResponse>builder()
                .result(paymentService.createPayment(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<PaymentResponse> getPaymentById(@PathVariable Long id) {
        return ApiResponse.<PaymentResponse>builder()
                .result(paymentService.getPaymentById(id))
                .build();
    }

    @GetMapping
    public ApiResponse<List<PaymentResponse>> getAllPayments() {
        return ApiResponse.<List<PaymentResponse>>builder()
                .result(paymentService.getAllPayments())
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<PaymentResponse> updatePayment(@PathVariable Long id, @RequestBody @Valid PaymentCreationRequest request) {
        return ApiResponse.<PaymentResponse>builder()
                .result(paymentService.updatePayment(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ApiResponse.<Void>builder().result(null).build();
    }
}
