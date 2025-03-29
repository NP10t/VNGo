package com.group1.VNGo.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserCreationRequest {

    private String phoneNumber;

    @Size(min = 8, message = "PASSWORD_INVALID")
    private String password;

    private String fullName;
    private LocalDate dob;
}
