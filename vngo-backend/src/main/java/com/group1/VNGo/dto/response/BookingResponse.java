package com.group1.VNGo.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.group1.VNGo.dto.request.LocationCreationRequest;
import com.group1.VNGo.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {

    private String id;
    
    private String userId;

    private String driverId;

    private String pickupLocationId;

    private String destinationLocationId;

    private Double estimatedPrice;

    private Double finalPrice;

    private LocalDateTime pickupTime;

    private LocalDateTime completionTime;

    private BookingStatus bookingStatus;

    private String cancellationReason;
}
