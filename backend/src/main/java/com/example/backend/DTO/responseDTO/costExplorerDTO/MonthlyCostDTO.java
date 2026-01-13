package com.example.backend.DTO.responseDTO.costExplorerDTO;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MonthlyCostDTO {

    private String date;

    @Builder.Default
    private List<InstanceCostDTO> instances = new ArrayList<>();
}
