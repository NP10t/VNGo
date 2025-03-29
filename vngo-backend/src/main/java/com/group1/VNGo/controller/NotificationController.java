package com.group1.VNGo.controller;


import com.group1.VNGo.dto.request.NotificationRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.NotificationResponse;
import com.group1.VNGo.service.NotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationController {

    NotificationService notificationService;

    @PostMapping()
    public ApiResponse<NotificationResponse> sendNotification(
            @RequestBody NotificationRequest notificationRequest
    ) {
        return ApiResponse.<NotificationResponse>builder()
                        .result(notificationService.createNotification(notificationRequest))
                        .build();
    }

    @GetMapping()
    public ApiResponse<List<NotificationResponse>> getAllNotifications() {
        return ApiResponse.<List<NotificationResponse>>builder()
                .result(notificationService.getAllNotifications())
                .build();
    }

    @GetMapping("/recipient/{recipientId}")
    public ApiResponse<List<NotificationResponse>> getNotificationsByRecipientId(
            @PathVariable String recipientId
    ) {
        return ApiResponse.<List<NotificationResponse>>builder()
                .result(notificationService.getNotificationsByRecipientId(recipientId))
                .build();
    }

    @PutMapping("/{notificationId}")
    public ApiResponse<NotificationResponse> updateNotification(
            @PathVariable Long notificationId,
            @RequestBody NotificationRequest notificationRequest
    ) {
        return ApiResponse.<NotificationResponse>builder()
                .result(notificationService.updateNotification(notificationId, notificationRequest))
                .build();
    }

    @DeleteMapping("/{notificationId}")
    public ApiResponse<NotificationResponse> deleteNotification(
            @PathVariable Long notificationId
    ) {
        return ApiResponse.<NotificationResponse>builder()
                .result(notificationService.deleteNotification(notificationId))
                .build();
    }
}
