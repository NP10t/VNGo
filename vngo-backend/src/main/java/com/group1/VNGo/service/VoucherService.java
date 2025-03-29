package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.VoucherRequest;
import com.group1.VNGo.dto.response.VoucherResponse;
import com.group1.VNGo.entity.Voucher;
import com.group1.VNGo.enums.VoucherStatus;
import com.group1.VNGo.mapper.VoucherMapper;
import com.group1.VNGo.repository.VoucherRepository;
//import com.group1.VNGo.repository.VoucherStatusRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Service
@RequiredArgsConstructor
@Slf4j
public class VoucherService {
    private final VoucherRepository voucherRepository;
//    private final VoucherStatusRepository voucherStatusRepository;
    private final VoucherMapper voucherMapper;

    public VoucherResponse createVoucher(VoucherRequest voucherRequest){
        Voucher voucher = voucherMapper.toVoucher(voucherRequest);
        voucherRepository.save(voucher);
        return voucherMapper.toVoucherResponse(voucher);
    }

    public List<VoucherResponse> getAllVouchers() {

        return voucherRepository
                .findAll()
                .stream()
                .map(voucherMapper::toVoucherResponse)
                .collect(Collectors.toList());
    }

    public VoucherResponse updateVoucher(Long voucherId, VoucherRequest voucherRequest) {
        Voucher voucher = voucherRepository.findById(voucherId).
                orElseThrow(() -> new IllegalArgumentException("Invalid voucher ID."));

        voucherMapper.updateVoucherFromRequest(voucherRequest, voucher);

        voucherRepository.save(voucher);
        return voucherMapper.toVoucherResponse(voucher);
    }

    public VoucherResponse deleteVoucher(Long voucherId) {
        Voucher voucher = voucherRepository.findById(voucherId).
                orElseThrow(() -> new IllegalArgumentException("Invalid voucher ID."));
        voucherRepository.delete(voucher);
        return voucherMapper.toVoucherResponse(voucher);
    }
}
