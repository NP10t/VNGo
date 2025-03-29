package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.NotificationRequest;
import com.group1.VNGo.dto.response.NotificationResponse;
import com.group1.VNGo.entity.Notification;
import com.group1.VNGo.mapper.NotificationMapper;
import com.group1.VNGo.repository.NotificationRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public NotificationResponse createNotification(NotificationRequest notificationRequest){
        Notification notification = notificationMapper.toNotification(notificationRequest);
        notificationRepository.save(notification);
        return notificationMapper.toNotificationResponse(notification);
    }

    public List<NotificationResponse> getAllNotifications() {

        return notificationRepository
                .findAll()
                .stream()
                .map(notificationMapper::toNotificationResponse)
                .collect(Collectors.toList());
    }

    public List<NotificationResponse> getNotificationsByRecipientId(String recipientId) {
        return notificationRepository
                .findByRecipientId(recipientId)
                .stream()
                .map(notificationMapper::toNotificationResponse)
                .collect(Collectors.toList());
    }


    public NotificationResponse updateNotification(Long notificationId, NotificationRequest notificationRequest) {
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification == null) {
            return null;
        }

        notificationMapper.updateNotificationFromRequest(notificationRequest, notification);
        notificationRepository.save(notification);
        return notificationMapper.toNotificationResponse(notification);
    }

    public NotificationResponse deleteNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification == null) {
            return null;
        }

        notificationRepository.delete(notification);
        return notificationMapper.toNotificationResponse(notification);
    }
}
