package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.LocationCreationRequest;
import com.group1.VNGo.dto.request.LocationUpdateRequest;
import com.group1.VNGo.dto.response.LocationResponse;
import com.group1.VNGo.entity.Location;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.Optional;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    Location toLocation(LocationCreationRequest request);

    Location toLocation(LocationResponse response);

    LocationResponse toLocationResponse(Location location);

    void updateLocationFromDto(LocationUpdateRequest dto, @MappingTarget Location location);
}
