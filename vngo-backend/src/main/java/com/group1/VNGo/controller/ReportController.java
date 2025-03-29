package com.group1.VNGo.controller;

import com.group1.VNGo.dto.request.ReportCreationRequest;
import com.group1.VNGo.dto.request.ReportResolveRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.ReportResponse;
import com.group1.VNGo.service.ReportService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportController {
    ReportService reportService;

    @PostMapping()
    ApiResponse<ReportResponse> createReport(@RequestBody ReportCreationRequest request) {
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.createReport(request))
                .build();
    }

    @GetMapping("/{reportId}")
    ApiResponse<ReportResponse> getReport(@PathVariable String reportId) {
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.getReport(reportId))
                .build();
    }

    @PutMapping("/{reportId}")
    ApiResponse<ReportResponse> resolveReport(@PathVariable String reportId, @RequestBody ReportResolveRequest request) {
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.resolveReport(reportId, request))
                .build();
    }
}
