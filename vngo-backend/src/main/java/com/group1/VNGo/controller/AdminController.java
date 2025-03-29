package com.group1.VNGo.controller;

import com.group1.VNGo.dto.request.AdminCreationRequest;
import com.group1.VNGo.dto.request.AdminUpdateRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.AdminResponse;
import com.group1.VNGo.service.AdminService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class  AdminController {

    AdminService adminService;

    @PostMapping
    ApiResponse<AdminResponse> createAdmin(@RequestBody @Valid AdminCreationRequest request) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.createAdmin(request))
                .build();
    }

    @GetMapping("/{phoneNumber}")
    public ApiResponse<AdminResponse> getAdminByPhoneNumber(@PathVariable String phoneNumber) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.getAdminByPhoneNumber(phoneNumber))
                .build();
    }

    @GetMapping
    public ApiResponse<List<AdminResponse>> getAllAdmins() {
        return ApiResponse.<List<AdminResponse>>builder()
                .result(adminService.getAllAdmins())
                .build();
    }

    @PutMapping("/{phoneNumber}")
    public ApiResponse<AdminResponse> updateAdmin(@PathVariable String phoneNumber, @RequestBody @Valid AdminUpdateRequest request) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.updateAdmin(phoneNumber, request))
                .build();
    }

    @DeleteMapping("/{phoneNumber}")
    public ApiResponse<Void> deleteAdmin(@PathVariable String phoneNumber) {
        adminService.deleteAdmin(phoneNumber);
        return ApiResponse.<Void>builder().result(null).build();
    }
}
