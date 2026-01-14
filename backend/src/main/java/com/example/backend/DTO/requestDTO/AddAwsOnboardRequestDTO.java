package com.example.backend.DTO.requestDTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddAwsOnboardRequestDTO {

    @NotNull(message="AccountARN cannot be Empty")
    private String accountARN;
    @NotNull(message="Account Name cannot be Empty")
    private String accountName;
}
