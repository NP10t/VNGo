package com.group1.VNGo.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {
    private Long id;
    private String recipientId;
    private String title;
    private String content;
    private String type;
    private Boolean isRead;
}
