package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.DriverWalletRequest;
import com.group1.VNGo.dto.response.DriverWalletResponse;
import com.group1.VNGo.entity.DriverWallet;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DriverWalletMapper {

    DriverWalletResponse toDriverWalletResponse(DriverWallet driverWallet);

    DriverWallet toDriverWallet(DriverWalletRequest driverWalletRequest);
}
