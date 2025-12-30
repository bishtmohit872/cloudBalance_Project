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

    @NotNull
    private String accountARN;
    @NotNull
    private String accountName;
    @NotNull
    private String accountStatus;
}
