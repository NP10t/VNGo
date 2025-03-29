package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.RatingCreationRequest;
import com.group1.VNGo.dto.response.RatingResponse;
import com.group1.VNGo.entity.Rating;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RatingMapper {
    Rating toRating(RatingCreationRequest request);

    RatingResponse toRatingResponse(Rating rating);
}
