package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.BookingCreationRequest;
import com.group1.VNGo.dto.response.BookingResponse;
import com.group1.VNGo.dto.response.LocationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class SocketNotificationService {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private LocationService locationService;

    public void notifyUser(String userId, BookingResponse booking) {
        System.out.println("Sending notification to user: " + userId);
        messagingTemplate.convertAndSend("/topic/user/" + userId + "/booking-accepted", booking);
    }

    public void notifyUserFinish(String userId, BookingResponse booking) {
        System.out.println("Sending notification to user: " + userId);
        messagingTemplate.convertAndSend("/topic/user/" + userId + "/booking-finished", booking);
    }

    public void notifyDrivers(BookingResponse booking) {
        System.out.println("Sending booking notification: " + booking);
        messagingTemplate.convertAndSend("/topic/bookings", booking);
    }


}
