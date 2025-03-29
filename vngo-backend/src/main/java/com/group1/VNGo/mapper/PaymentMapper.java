package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.PaymentCreationRequest;
import com.group1.VNGo.dto.response.PaymentResponse;
import com.group1.VNGo.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    Payment toPayment(PaymentCreationRequest request);

    PaymentResponse toPaymentResponse(Payment payment);

    void updatePaymentFromDto(PaymentCreationRequest dto, @MappingTarget Payment payment);
}
