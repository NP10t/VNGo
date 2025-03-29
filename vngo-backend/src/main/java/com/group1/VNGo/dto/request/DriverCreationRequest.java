    package com.group1.VNGo.dto.request;

    import jakarta.validation.constraints.Size;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.time.LocalDate;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public class DriverCreationRequest {

        private String phoneNumber;

        @Size(min = 8, message = "PASSWORD_INVALID")
        private String password;

        private String fullName;
        private LocalDate dateOfBirth;

    }
