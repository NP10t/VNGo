package com.group1.VNGo.dto.request;

import com.group1.VNGo.enums.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ReportResolveRequest {
    private ReportStatus reportStatus;
}
