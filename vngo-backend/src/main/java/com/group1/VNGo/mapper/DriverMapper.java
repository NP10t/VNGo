package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.DriverCreationRequest;
import com.group1.VNGo.dto.request.DriverUpdateRequest;
import com.group1.VNGo.dto.response.DriverResponse;
import com.group1.VNGo.dto.response.DriverResponseUpdate;
import com.group1.VNGo.entity.Driver;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DriverMapper {

    DriverResponse toDriverResponse(Driver driver);

    Driver toDriver(DriverCreationRequest request);

    DriverResponseUpdate toDriverResponseUpdate(Driver driver);

    void updateDriverFromDto(DriverUpdateRequest request, @MappingTarget Driver driver); // Cập nhật Driver từ DTO
}
