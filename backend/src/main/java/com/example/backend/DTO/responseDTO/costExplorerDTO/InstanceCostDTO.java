package com.example.backend.DTO.responseDTO.costExplorerDTO;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InstanceCostDTO {
    private String instanceType;
    private Double monthlyCost;
}
