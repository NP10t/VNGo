package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.DriverCreationRequest;
import com.group1.VNGo.dto.request.DriverUpdateRequest;
import com.group1.VNGo.dto.response.DriverEarningsResponse;
import com.group1.VNGo.dto.response.DriverResponse;
import com.group1.VNGo.dto.response.DriverResponseUpdate;
import com.group1.VNGo.entity.Driver;
import com.group1.VNGo.exception.AppException;
import com.group1.VNGo.exception.ErrorCode;
import com.group1.VNGo.mapper.DriverMapper;
import com.group1.VNGo.repository.DriverRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Service
@RequiredArgsConstructor
@Slf4j
public class DriverService {

    private final DriverRepository driverRepository;
    private final PasswordEncoder passwordEncoder;
    private final DriverMapper driverMapper;

    // Tạo driver mới
    public DriverResponse createDriver(DriverCreationRequest request) {
        if (driverRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new AppException(ErrorCode.USER_EXISTED);  // Nếu số điện thoại đã tồn tại
        }

        Driver driver = driverMapper.toDriver(request);
        driver.setPassword(passwordEncoder.encode(request.getPassword()));  // Mã hóa mật khẩu

        return driverMapper.toDriverResponse(driverRepository.save(driver));  // Lưu và trả về phản hồi
    }

    // Lấy thông tin driver theo số điện thoại
    public DriverResponse getDriverByPhoneNumber(String phoneNumber) {
        Driver driver = driverRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));  // Nếu không tìm thấy, ném lỗi

        return driverMapper.toDriverResponse(driver);  // Trả về thông tin driver
    }

    // Lấy tất cả driver
    public List<DriverResponse> getAllDrivers() {
        List<Driver> drivers = driverRepository.findAll();

        return drivers.stream()
                .map(driverMapper::toDriverResponse)
                .toList();
    }

    public DriverResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        Driver driver = driverRepository.findByPhoneNumber(name)
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_EXISTED));
        return driverMapper.toDriverResponse(driver);
    }

    public DriverEarningsResponse getMyEarnings() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        Driver driver = driverRepository.findByPhoneNumber(name)
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_EXISTED));
        return DriverEarningsResponse.builder()
                .totalEarnings(driver.getTotalEarnings())
                .build();
    }

    // Cập nhật thông tin driver
    public DriverResponseUpdate updateDriver(String phoneNumber, DriverUpdateRequest request) {
        Driver driver = driverRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));  // Nếu không tìm thấy, ném lỗi

        driverMapper.updateDriverFromDto(request, driver);  // Cập nhật thông tin driver từ DTO



        return driverMapper.toDriverResponseUpdate(driverRepository.save(driver));  // Lưu và trả về phản hồi
    }

    // Xóa driver
    public void deleteDriver(String phoneNumber) {
        Driver driver = driverRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));  // Nếu không tìm thấy, ném lỗi

        driverRepository.delete(driver);  // Xóa driver
    }
}
