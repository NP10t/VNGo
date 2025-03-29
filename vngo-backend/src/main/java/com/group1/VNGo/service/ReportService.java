package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.ReportCreationRequest;
import com.group1.VNGo.dto.request.ReportResolveRequest;
import com.group1.VNGo.dto.response.ReportResponse;
import com.group1.VNGo.enums.ReportStatus;
import com.group1.VNGo.exception.AppException;
import com.group1.VNGo.exception.ErrorCode;
import com.group1.VNGo.mapper.ReportMapper;
import com.group1.VNGo.repository.AdminRepository;
import com.group1.VNGo.repository.ReportRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Builder
@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {
    private final ReportRepository reportRepository;
    private final AdminRepository adminRepository;
    private final ReportMapper reportMapper;

    public ReportResponse createReport(ReportCreationRequest request) {
        var report = reportMapper.toReport(request);
        report.setReportStatus(ReportStatus.PENDING);
        return reportMapper.toReportResponse(reportRepository.save(report));
    }

    public ReportResponse getReport(String reportId) {
        var report = reportRepository.findById(reportId)
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_NOT_EXISTED));
        return reportMapper.toReportResponse(report);
    }

    public ReportResponse resolveReport(String reportId, ReportResolveRequest request) {
        var report = reportRepository.findById(reportId)
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_NOT_EXISTED));
        var context = SecurityContextHolder.getContext();
        var admin = adminRepository.findById(context.getAuthentication().getName())
                .orElseThrow(() -> new AppException(ErrorCode.ADMIN_NOT_EXISTED));
        report.setAdmin(admin);
        report.setReportStatus(request.getReportStatus());
        return reportMapper.toReportResponse(report);
    }
}
