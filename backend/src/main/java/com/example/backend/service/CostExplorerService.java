package com.example.backend.service;

import com.example.backend.DTO.responseDTO.costExplorerDTO.*;
import com.example.backend.DTO.responseDTO.costExplorerDTO.accountInstanceCost.AccountInstanceCostDTO;
import com.example.backend.DTO.responseDTO.costExplorerDTO.categoryCost.CategoryCostDTO;
import com.example.backend.DTO.responseDTO.costExplorerDTO.categoryCost.MonthlyCategoryDTO;
import com.example.backend.DTO.responseDTO.costExplorerDTO.monthlyCost.InstanceCostDTO;
import com.example.backend.DTO.responseDTO.costExplorerDTO.monthlyCost.MonthlyCostDTO;
import com.example.backend.repository.CostExplorerRepository;
import com.snowflake.snowpark.Row;

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

    public List<AccountInstanceCostDTO> fetchByAccountId(String accountId){
        Row[] rows = costExplorerRepository.getByAccountId(accountId);
        System.out.println(rows);

        Map<String,List<InstanceCostDTO>> accountMonthWiseMap = new LinkedHashMap<>();

        for(Row row : rows){
            String instanceType = row.get(0).toString();
            String date = row.get(1).toString();
            Double profit = row.getDouble(2);

            accountMonthWiseMap
                    .computeIfAbsent(date,k->new ArrayList<>())
                            .add(InstanceCostDTO.builder()
                                    .instanceType(instanceType)
                                    .monthlyCost(profit)
                                    .build()
                            );
            }
        List<AccountInstanceCostDTO> accountInstanceCostDTO = new ArrayList<>();

        for(Map.Entry<String,List<InstanceCostDTO>> entry: accountMonthWiseMap.entrySet()){

            accountInstanceCostDTO.add(AccountInstanceCostDTO.builder()
                    .date(entry.getKey())
                    .instanceCostDTO(entry.getValue())
                    .build()
            );
        }
        return accountInstanceCostDTO;
    }
}
