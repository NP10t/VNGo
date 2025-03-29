package com.group1.VNGo.dto.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RatingCreationRequest {
    @NonNull
    private String bookingId;

    @NonNull
    private Integer rating;
    private String comment;
}
