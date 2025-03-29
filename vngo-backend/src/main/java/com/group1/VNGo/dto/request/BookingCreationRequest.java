package com.group1.VNGo.dto.request;

import com.group1.VNGo.enums.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BookingCreationRequest {
    
    private LocationCreationRequest pickupLocation;

    private LocationCreationRequest destinationLocation;

    private Double estimatedPrice;

    private VehicleType vehicleType;
}
