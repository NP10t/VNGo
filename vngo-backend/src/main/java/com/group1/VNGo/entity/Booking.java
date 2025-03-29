package com.group1.VNGo.entity;

import com.group1.VNGo.enums.BookingStatus;
import com.group1.VNGo.enums.VehicleType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@SuperBuilder
@Table(name = "bookings")
public class Booking extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Driver driver;

    @ManyToOne
    private Location pickupLocation;

    @ManyToOne
    private Location destinationLocation;

    private VehicleType vehicleType;

    private Double estimatedPrice;

    private Double finalPrice;

    private LocalDateTime pickupTime;

    private LocalDateTime completionTime;

    private BookingStatus bookingStatus;

    private String cancellationReason;
}
