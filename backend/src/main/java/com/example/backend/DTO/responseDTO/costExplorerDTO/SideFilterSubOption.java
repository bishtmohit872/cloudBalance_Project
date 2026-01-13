package com.example.backend.DTO.responseDTO.costExplorerDTO;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SideFilterSubOption {

    @Builder.Default
    private List<String> sideSubOptions = new ArrayList<>();
}
