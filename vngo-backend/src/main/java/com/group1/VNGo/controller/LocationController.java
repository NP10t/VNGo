package com.group1.VNGo.controller;

import com.group1.VNGo.dto.request.LocationCreationRequest;
import com.group1.VNGo.dto.request.LocationUpdateRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.LocationResponse;
import com.group1.VNGo.entity.Location;
import com.group1.VNGo.service.LocationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LocationController {
    LocationService locationService;

    @PostMapping()
    ApiResponse<Location> createLocation(@RequestBody LocationCreationRequest request) {
        return ApiResponse.<Location>builder()
                .result(locationService.createLocation(request))
                .build();
    }

    @GetMapping("/{locationId}")
    ApiResponse<LocationResponse> getLocationById(@PathVariable String locationId) {
        return ApiResponse.<LocationResponse>builder()
                .result(locationService.getLocationById(locationId))
                .build();
    }
    @GetMapping
    public ApiResponse<List<LocationResponse>> getAllLocations() {
        return ApiResponse.<List<LocationResponse>>builder()
                .result(locationService.getAllLocations())
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<LocationResponse> updateLocation(@PathVariable String id, @RequestBody @Valid LocationUpdateRequest request) {
        return ApiResponse.<LocationResponse>builder()
                .result(locationService.updateLocation(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteLocation(@PathVariable String id) {
        locationService.deleteLocation(id);
        return ApiResponse.<Void>builder().result(null).build();
    }
}
