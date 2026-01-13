package com.example.backend.DTO.responseDTO.costExplorerDTO.accountInstanceCost;

import com.example.backend.DTO.responseDTO.costExplorerDTO.monthlyCost.InstanceCostDTO;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AccountInstanceCostDTO {
    private String date;

    @Builder.Default
    private List<InstanceCostDTO> instanceCostDTO = new ArrayList<>();
}
