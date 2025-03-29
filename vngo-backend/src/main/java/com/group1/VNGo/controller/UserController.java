package com.group1.VNGo.controller;

import com.group1.VNGo.dto.request.UserCreationRequest;
import com.group1.VNGo.dto.request.UserUpdateRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.UserResponse;
import com.group1.VNGo.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    @PostMapping()
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping("/{phoneNumber}")
    public ApiResponse<UserResponse> getUserByPhoneNumber(@PathVariable String phoneNumber) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUserByPhoneNumber(phoneNumber))
                .build();
    }

    @GetMapping("/my-info")
    public ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @GetMapping()
    public ApiResponse<List<UserResponse>> getAllUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getAllUsers())
                .build();
    }

    @PutMapping("/{phoneNumber}")
    public ApiResponse<UserResponse> updateUser(@PathVariable String phoneNumber, @RequestBody @Valid UserUpdateRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUser(phoneNumber, request))
                .build();
    }

    @DeleteMapping("/{phoneNumber}")
    public ApiResponse<Void> deleteUser(@PathVariable String phoneNumber) {
        userService.deleteUser(phoneNumber);
        return ApiResponse.<Void>builder().result(null).build();
    }
}
