package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.DriverWalletRequest;
import com.group1.VNGo.dto.response.DriverWalletResponse;
import com.group1.VNGo.entity.DriverWallet;
import com.group1.VNGo.exception.AppException;
import com.group1.VNGo.exception.ErrorCode;
import com.group1.VNGo.mapper.DriverWalletMapper;
import com.group1.VNGo.repository.DriverRepository;
import com.group1.VNGo.repository.DriverWalletRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Service
@RequiredArgsConstructor
@Slf4j
public class DriverWalletService {
    private final DriverWalletRepository driverWalletRepository;
    private final DriverRepository driverRepository;
    private final DriverWalletMapper driverWalletMapper;

    public DriverWalletResponse createDriverWallet(DriverWalletRequest driverWalletRequest) {
        var context = SecurityContextHolder.getContext();
        var phoneNumber = context.getAuthentication().getName();
        var driver = driverRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_EXISTED));

        DriverWallet driverWallet = DriverWallet.builder()
                .driverId(driver.getId())
                .balance(driverWalletRequest.getBalance())
                .build();
        return driverWalletMapper.toDriverWalletResponse(driverWalletRepository.save(driverWallet));
    }

    public DriverWalletResponse getDriverWalletById(String driverId) {
        return driverWalletRepository
                .findByDriverId(driverId)
                .map(driverWalletMapper::toDriverWalletResponse)
                .orElse(null);
    }

    public DriverWalletResponse getMyWallet() {
        var context = SecurityContextHolder.getContext();
        var phoneNumber = context.getAuthentication().getName();
        var driver = driverRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_EXISTED));
        var driverWallet = driverWalletRepository.findByDriverId(driver.getId())
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_WALLET_NOT_EXISTED));
        return driverWalletMapper.toDriverWalletResponse(driverWallet);
    }



    public List<DriverWalletResponse> getAllDriverWallets() {
        return driverWalletRepository
                .findAll()
                .stream()
                .map(driverWalletMapper::toDriverWalletResponse)
                .collect(Collectors.toList());
    }

    public DriverWalletResponse updateDriverWallet(String driverId, DriverWalletRequest driverWalletRequest) {
        DriverWallet driverWallet = driverWalletRepository.findByDriverId(driverId).orElse(null);
        if (driverWallet == null) {
            return null;
        }
        driverWallet.setBalance(driverWalletRequest.getBalance());
        driverWalletRepository.save(driverWallet);
        return driverWalletMapper.toDriverWalletResponse(driverWallet);
    }

    public DriverWalletResponse deleteDriverWallet(String driverId) {
        DriverWallet driverWallet = driverWalletRepository.findByDriverId(driverId).orElse(null);
        if (driverWallet == null) {
            return null;
        }
        driverWalletRepository.delete(driverWallet);
        return driverWalletMapper.toDriverWalletResponse(driverWallet);
    }
}
