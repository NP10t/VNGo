package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.NotificationRequest;
import com.group1.VNGo.dto.response.NotificationResponse;
import com.group1.VNGo.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationResponse toNotificationResponse(Notification notification);

    Notification toNotification(NotificationRequest dto);

    void updateNotificationFromRequest(NotificationRequest notificationRequest, @MappingTarget Notification notification);
}