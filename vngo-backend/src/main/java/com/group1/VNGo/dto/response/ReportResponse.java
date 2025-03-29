package com.group1.VNGo.dto.response;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.group1.VNGo.enums.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ReportResponse {
    private String id;
    private String bookingId;
    private String reason;
    private ReportStatus reportStatus;
    private String adminId;
}
