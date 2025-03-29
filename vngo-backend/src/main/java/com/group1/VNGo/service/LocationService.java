package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.LocationCreationRequest;
import com.group1.VNGo.dto.request.LocationUpdateRequest;
import com.group1.VNGo.dto.response.LocationResponse;
import com.group1.VNGo.entity.Location;
import com.group1.VNGo.exception.AppException;
import com.group1.VNGo.exception.ErrorCode;
import com.group1.VNGo.mapper.LocationMapper;
import com.group1.VNGo.repository.LocationRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Service
@RequiredArgsConstructor
@Slf4j
public class LocationService {
    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;

    public Location createLocation(LocationCreationRequest request) {
        if (locationRepository.existsById(request.getId())) {
            return locationRepository.findById(request.getId()).orElseThrow();
        }

        return locationRepository.save(locationMapper.toLocation(request));

    }

    public LocationResponse getLocationById(String id) {
        var location = locationRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.LOCATION_NOT_EXISTED));
        return locationMapper.toLocationResponse(location);
    }   
    public List<LocationResponse> getAllLocations() {
        return locationRepository.findAll()
                .stream()
                .map(locationMapper::toLocationResponse)
                .toList();
    }

    public LocationResponse updateLocation(String id, LocationUpdateRequest request) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.LOCATION_NOT_EXISTED));

        locationMapper.updateLocationFromDto(request, location);

        return locationMapper.toLocationResponse(locationRepository.save(location));
    }

    public void deleteLocation(String id) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.LOCATION_NOT_EXISTED));

        locationRepository.delete(location);
    }
}
