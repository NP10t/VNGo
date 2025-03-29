package com.group1.VNGo.dto.request;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LocationCreationRequest {

    private String id;

    private Double latitude;

    private Double longitude;

    private String address;

    private String city;

    private String district;

    private String ward;
}
