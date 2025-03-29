package com.group1.VNGo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LocationUpdateRequest {

    private Double latitude;

    private Double longitude;

    private String address;

    private String city;

    private String district;

    private String ward;
}
