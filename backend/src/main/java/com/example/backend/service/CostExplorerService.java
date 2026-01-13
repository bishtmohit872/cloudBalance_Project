package com.example.backend.service;

import com.example.backend.DTO.responseDTO.costExplorerDTO.*;
import com.example.backend.repository.CostExplorerRepository;
import com.snowflake.snowpark.Row;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service

public class CostExplorerService {

    @Autowired
    CostExplorerRepository costExplorerRepository;

    public SideFilterSubOption fetchColumnData(String col){
        Row[] rows = costExplorerRepository.getColumnData(col);
        List<String> subOptions = new ArrayList<>();
        for(Row row: rows){
            subOptions.add(row.get(0).toString());
        }
        System.out.println(subOptions);
        return SideFilterSubOption.builder()
                .sideSubOptions(subOptions).build();
    }

    public List<MonthlyCostDTO> fetchMonthWiseData(String groupBy){

        //This Data structure is used because for every new Date it will create new key and store corresponding data into it
        Map<String, List<InstanceCostDTO>> monthWiseMap = new LinkedHashMap<>();

        //for mapping from monthWiseMap to monthlyCostDTOList and it for response
        List<MonthlyCostDTO> monthlyCostDTOList = new ArrayList<>();

        Row[] rows = costExplorerRepository.getMonthWiseData(groupBy);

        for(Row row : rows){
            System.out.println(row);
            monthWiseMap.computeIfAbsent(row.get(1).toString(),value->new ArrayList<>())
                    .add(new InstanceCostDTO(row.get(0).toString(),row.getDouble(2)));
        }

        //mapping
        for(Map.Entry<String,List<InstanceCostDTO>> entry : monthWiseMap.entrySet()){
            monthlyCostDTOList.add(MonthlyCostDTO.builder()
                    .date(entry.getKey())
                    .instances(entry.getValue())
                    .build());
        }

        return monthlyCostDTOList;
    }

    public List<MonthlyCategoryDTO> fetchByCategory(String category, String value) {

        Row[] rows = costExplorerRepository.getByCategory(category, value);
        Map<String, List<CategoryCostDTO>> monthWiseMap = new LinkedHashMap<>();

        for (Row row : rows) {

            String instanceType = row.getString(0);
            String month = row.getDate(1).toString();
            Integer profit = row.getInt(2);


            monthWiseMap
                    .computeIfAbsent(month, k -> new ArrayList<>())
                    .add( CategoryCostDTO.builder()
                            .instanceType(instanceType)
                            .profit(profit)
                            .build());
        }

        List<MonthlyCategoryDTO> monthlyCategoryDTOList = new ArrayList<>();

        for (Map.Entry<String, List<CategoryCostDTO>> entry : monthWiseMap.entrySet()) {
            monthlyCategoryDTOList.add(
                    MonthlyCategoryDTO.builder()
                            .data(entry.getKey())
                            .categoryCost(entry.getValue())
                            .build()
            );
        }
        return monthlyCategoryDTOList;
    }




}
