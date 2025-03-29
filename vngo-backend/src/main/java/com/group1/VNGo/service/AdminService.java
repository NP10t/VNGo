package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.AdminCreationRequest;
import com.group1.VNGo.dto.request.AdminUpdateRequest;
import com.group1.VNGo.dto.response.AdminResponse;
import com.group1.VNGo.entity.Admin;
import com.group1.VNGo.exception.AppException;
import com.group1.VNGo.exception.ErrorCode;
import com.group1.VNGo.mapper.AdminMapper;
import com.group1.VNGo.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminMapper adminMapper;

    public AdminResponse createAdmin(AdminCreationRequest request) {
        if (adminRepository.existsByPhoneNumber(request.getPhoneNumber()))
            throw new AppException(ErrorCode.USER_EXISTED);

        Admin admin = adminMapper.toAdmin(request);
        admin.setPassword(passwordEncoder.encode(request.getPassword()));

        return adminMapper.toAdminResponse(adminRepository.save(admin));
    }

    public AdminResponse getAdminByPhoneNumber(String phoneNumber) {
        Admin admin = adminRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return adminMapper.toAdminResponse(admin);
    }

    public List<AdminResponse> getAllAdmins() {
        return adminRepository.findAll()
                .stream()
                .map(adminMapper::toAdminResponse)
                .collect(Collectors.toList());
    }

    public AdminResponse updateAdmin(String phoneNumber, AdminUpdateRequest request) {
        Admin admin = adminRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        adminMapper.updateAdminFromDto(request, admin);

        if (request.getPassword() != null) {
            admin.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return adminMapper.toAdminResponse(adminRepository.save(admin));
    }

    public void deleteAdmin(String phoneNumber) {
        Admin admin = adminRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        adminRepository.delete(admin);
    }
}
