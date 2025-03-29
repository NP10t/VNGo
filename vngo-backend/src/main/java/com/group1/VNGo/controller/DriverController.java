package com.group1.VNGo.controller;

import com.group1.VNGo.dto.request.DriverCreationRequest;
import com.group1.VNGo.dto.request.DriverUpdateRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.DriverEarningsResponse;
import com.group1.VNGo.dto.response.DriverResponse;
import com.group1.VNGo.dto.response.DriverResponseUpdate;
import com.group1.VNGo.service.DriverService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/drivers")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DriverController {

    DriverService driverService;

    @PostMapping()
    public ApiResponse<DriverResponse> createDriver(@RequestBody @Valid DriverCreationRequest request) {
        return ApiResponse.<DriverResponse>builder()
                .result(driverService.createDriver(request))
                .build();
    }

    // API lấy thông tin driver theo số điện thoại
    @GetMapping("/{phoneNumber}")
    public ApiResponse<DriverResponse> getDriverByPhoneNumber(@PathVariable String phoneNumber) {
        return ApiResponse.<DriverResponse>builder()
                .result(driverService.getDriverByPhoneNumber(phoneNumber))
                .build();
    }

    // API lấy tất cả driver
    @GetMapping()
    public ApiResponse<List<DriverResponse>> getAllDrivers() {
        return ApiResponse.<List<DriverResponse>>builder()
                .result(driverService.getAllDrivers())
                .build();
    }

    @GetMapping("/my-info")
    public ApiResponse<DriverResponse> getMyInfo() {
        return ApiResponse.<DriverResponse>builder()
                .result(driverService.getMyInfo())
                .build();
    }

    @GetMapping("/my-earnings")
    public ApiResponse<DriverEarningsResponse> getMyEarnings() {
        return ApiResponse.<DriverEarningsResponse>builder()
                .result(driverService.getMyEarnings())
                .build();   
    }

    // API cập nhật thông tin driver
    @PutMapping("/{phoneNumber}")
    public ApiResponse<DriverResponseUpdate> updateDriver(@PathVariable String phoneNumber, @RequestBody @Valid DriverUpdateRequest request) {
        return ApiResponse.<DriverResponseUpdate>builder()
                .result(driverService.updateDriver(phoneNumber, request))
                .build();
    }

    // API xóa driver
    @DeleteMapping("/{phoneNumber}")
    public ApiResponse<Void> deleteDriver(@PathVariable String phoneNumber) {
        driverService.deleteDriver(phoneNumber);
        return ApiResponse.<Void>builder().result(null).build();
    }
}
