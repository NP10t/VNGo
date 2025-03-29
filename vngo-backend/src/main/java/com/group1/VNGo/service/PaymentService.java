package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.PaymentCreationRequest;
import com.group1.VNGo.dto.response.PaymentResponse;
import com.group1.VNGo.entity.Payment;
import com.group1.VNGo.exception.AppException;
import com.group1.VNGo.exception.ErrorCode;
import com.group1.VNGo.mapper.PaymentMapper;
import com.group1.VNGo.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    public PaymentResponse createPayment(PaymentCreationRequest request) {
        Payment payment = paymentMapper.toPayment(request);
        return paymentMapper.toPaymentResponse(paymentRepository.save(payment));
    }

    public PaymentResponse getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_NOT_EXISTED));
        return paymentMapper.toPaymentResponse(payment);
    }

    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(paymentMapper::toPaymentResponse)
                .collect(Collectors.toList());
    }

    public PaymentResponse updatePayment(Long id, PaymentCreationRequest request) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_NOT_EXISTED));

        paymentMapper.updatePaymentFromDto(request, payment);

        return paymentMapper.toPaymentResponse(paymentRepository.save(payment));
    }

    public void deletePayment(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_NOT_EXISTED));

        paymentRepository.delete(payment);
    }
}
