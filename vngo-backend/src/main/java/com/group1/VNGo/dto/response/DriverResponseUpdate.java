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
public class DriverResponseUpdate {

    private String fullName;
    private LocalDate dateOfBirth;

}
