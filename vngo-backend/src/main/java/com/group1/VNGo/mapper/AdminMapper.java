package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.AdminCreationRequest;
import com.group1.VNGo.dto.request.AdminUpdateRequest;
import com.group1.VNGo.dto.response.AdminResponse;
import com.group1.VNGo.entity.Admin;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AdminMapper {

    AdminResponse toAdminResponse(Admin admin);

    Admin toAdmin(AdminCreationRequest request);

    void updateAdminFromDto(AdminUpdateRequest dto, @MappingTarget Admin admin);
}
