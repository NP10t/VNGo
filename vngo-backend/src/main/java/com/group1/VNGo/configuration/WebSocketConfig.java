package com.group1.VNGo.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // Endpoint để kết nối WebSocket
                .setAllowedOrigins("**") // Cho phép tất cả các origin (có thể hạn chế cho bảo mật)
                .withSockJS(); // Sử dụng SockJS để hỗ trợ các fallback
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // Prefix cho broker (server gửi tới client)
        registry.setApplicationDestinationPrefixes("/app"); // Prefix cho các message từ client tới server
    }
}

