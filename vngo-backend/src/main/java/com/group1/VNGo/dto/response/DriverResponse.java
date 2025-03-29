package com.group1.VNGo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DriverResponse {

    private String id;
    private String phoneNumber;
    private String fullName;
    private LocalDate dateOfBirth;

}
