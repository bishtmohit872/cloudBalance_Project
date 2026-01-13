package com.example.backend.DTO.responseDTO.costExplorerDTO.categoryCost;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyCategoryDTO {
    private String data;
    @Builder.Default
    private List<CategoryCostDTO> categoryCost = new ArrayList<>();
}
