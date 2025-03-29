package com.group1.VNGo.controller;

import com.group1.VNGo.dto.request.VoucherRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.VoucherResponse;
import com.group1.VNGo.service.VoucherService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vouchers")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VoucherController {
    VoucherService voucherService;

    @PostMapping()
    public ApiResponse<VoucherResponse> createVoucher(
            @RequestBody VoucherRequest voucherRequest
    ) {
        return ApiResponse.<VoucherResponse>builder()
                        .result(voucherService.createVoucher(voucherRequest))
                        .build();
    }

    @GetMapping()
    public ApiResponse<List<VoucherResponse>> getAllVouchers() {
        return ApiResponse.<List<VoucherResponse>>builder()
                        .result(voucherService.getAllVouchers())
                        .build();
    }

    @PutMapping("/{voucherId}")
    public ApiResponse<VoucherResponse> updateVoucher(
            @PathVariable Long voucherId,
            @RequestBody VoucherRequest voucherRequest
    ) {
        return ApiResponse.<VoucherResponse>builder()
                        .result(voucherService.updateVoucher(voucherId, voucherRequest))
                        .build();
    }

    @DeleteMapping("/{voucherId}")
    public ApiResponse<VoucherResponse> deleteVoucher(
            @PathVariable Long voucherId
    ) {
        return ApiResponse.<VoucherResponse>builder()
                        .result(voucherService.deleteVoucher(voucherId))
                        .build();
    }
}
