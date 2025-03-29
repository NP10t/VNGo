package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.ReportCreationRequest;
import com.group1.VNGo.dto.response.ReportResponse;
import com.group1.VNGo.entity.Report;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReportMapper {
    Report toReport(ReportCreationRequest request);

    ReportResponse toReportResponse(Report report);
}
