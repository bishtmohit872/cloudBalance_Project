package com.example.backend.DTO.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AwsOnboardResponseDTO {

    private Long id;
    private String accountARN;
    private String accountName;
}
