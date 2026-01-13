package com.example.backend.DTO.responseDTO.costExplorerDTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryCostDTO {
    private String instanceType;
    private Integer profit;
}
