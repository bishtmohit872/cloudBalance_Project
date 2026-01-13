package com.example.backend.controller;

import com.example.backend.DTO.responseDTO.costExplorerDTO.accountInstanceCost.AccountInstanceCostDTO;
import com.example.backend.DTO.responseDTO.costExplorerDTO.categoryCost.MonthlyCategoryDTO;
import com.example.backend.DTO.responseDTO.costExplorerDTO.monthlyCost.MonthlyCostDTO;
import com.example.backend.DTO.responseDTO.costExplorerDTO.SideFilterSubOption;
import com.example.backend.service.CostExplorerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/snow/cost")
public class CostExplorerController {

    @Autowired
    CostExplorerService costExplorerService;

    @GetMapping()
    public ResponseEntity<SideFilterSubOption> getAllData(@RequestParam(name="column") String col){
        return ResponseEntity.status(HttpStatus.OK).body(costExplorerService.fetchColumnData(col));
    }

    @GetMapping("/month-wise")
    public ResponseEntity<List<MonthlyCostDTO>> getMonthWise(@RequestParam(name="groupby") String groupBy){
        return ResponseEntity.status(HttpStatus.OK).body(costExplorerService.fetchMonthWiseData(groupBy));
    }

    @GetMapping("/by-category")
    public ResponseEntity<List<MonthlyCategoryDTO>> getByCategory(@RequestParam(name="category") String category, @RequestParam(name="value") String value){
        return ResponseEntity.status(HttpStatus.OK).body(costExplorerService.fetchByCategory(category,value));
    }

    @GetMapping("/account")
    public ResponseEntity<List<AccountInstanceCostDTO>> getByAccountId(@RequestParam(name="accountId") String accountId){
        return ResponseEntity.status(HttpStatus.OK).body(costExplorerService.fetchByAccountId(accountId));
    }

}

