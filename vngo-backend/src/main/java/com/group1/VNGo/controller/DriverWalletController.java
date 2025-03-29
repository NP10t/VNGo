package com.group1.VNGo.controller;

import com.group1.VNGo.dto.request.DriverWalletRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.DriverWalletResponse;
import com.group1.VNGo.service.DriverWalletService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/driver-wallets")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DriverWalletController {

    DriverWalletService driverWalletService;

    @PostMapping()
    public ApiResponse<DriverWalletResponse> createDriverWallet(
            @RequestBody DriverWalletRequest driverWalletRequest
    ) {
        return ApiResponse.<DriverWalletResponse>builder()
                        .result(driverWalletService.createDriverWallet(driverWalletRequest))
                        .build();
    }

    @GetMapping("/{driverId}")
    public ApiResponse<DriverWalletResponse> getDriverWallet(
            @PathVariable String driverId
    ) {
        return ApiResponse.<DriverWalletResponse>builder()
                .result(driverWalletService.getDriverWalletById(driverId))
                .build();
    }

    @GetMapping("/my-wallet")
    public ApiResponse<DriverWalletResponse> getMyWallet() {
        return ApiResponse.<DriverWalletResponse>builder()
                .result(driverWalletService.getMyWallet())
                .build();
    }

    @GetMapping()
    public ApiResponse<List<DriverWalletResponse>> getAllDriverWallets() {
        return ApiResponse.<List<DriverWalletResponse>>builder()
                .result(driverWalletService.getAllDriverWallets())
                .build();
    }

    @PutMapping("/{driverId}")
    public ApiResponse<DriverWalletResponse> updateBalance(
            @PathVariable String driverId,
            @RequestBody DriverWalletRequest driverWalletRequest
    ) {
        return ApiResponse.<DriverWalletResponse>builder()
                .result(driverWalletService.updateDriverWallet(driverId, driverWalletRequest))
                .build();
    }

    @DeleteMapping("/{driverId}")
    public ApiResponse<DriverWalletResponse> deleteDriverWallet(
            @PathVariable String driverId
    ) {
        return ApiResponse.<DriverWalletResponse>builder()
                .result(driverWalletService.deleteDriverWallet(driverId))
                .build();
    }
}
