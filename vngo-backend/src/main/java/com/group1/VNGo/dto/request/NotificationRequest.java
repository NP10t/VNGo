package com.group1.VNGo.dto.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class NotificationRequest {
    private String recipientId;
    private String title;
    private String content;
    private String type;
    private Boolean isRead;
}
