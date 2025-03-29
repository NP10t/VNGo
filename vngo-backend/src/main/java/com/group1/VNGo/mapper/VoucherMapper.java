package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.VoucherRequest;
import com.group1.VNGo.dto.response.VoucherResponse;
import com.group1.VNGo.entity.Voucher;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface VoucherMapper {

    Voucher toVoucher(VoucherRequest request);

    VoucherResponse toVoucherResponse(Voucher voucher);

    void updateVoucherFromRequest(VoucherRequest voucherRequest, @MappingTarget Voucher voucher);
}