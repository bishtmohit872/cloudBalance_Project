package com.example.backend.controller;

import com.example.backend.DTO.responseDTO.costExplorerDTO.accountInstanceCost.AccountInstanceCostDTO;
import com.example.backend.DTO.responseDTO.costExplorerDTO.categoryCost.MonthlyCategoryDTO;
import com.example.backend.DTO.responseDTO.costExplorerDTO.monthlyCost.MonthlyCostDTO;
import com.example.backend.DTO.responseDTO.costExplorerDTO.SideFilterSubOption;
import com.example.backend.service.CostExplorerService;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/snow/cost")
@Validated
public class CostExplorerController {

    @Autowired
    CostExplorerService costExplorerService;

    @GetMapping()
    public ResponseEntity<SideFilterSubOption> getAllData(@RequestParam(name="column")
                                                              @Pattern(
                                                                      regexp="SERVICE|INSTANCE_TYPE|ACCOUNT_ID|USAGE_TYPE|PLATFORM|REGION|USAGE_TYPE_GROUP|PURCHASE_OPTION|API_OPERATION|RESOURCE|AVAILABILITY_ZONE|TENANCY|LEGAL_ENTITY|BILLING_ENTITY",
                                                                      message="Invalid Column Name"
                                                              )
                                                              String col){
        return ResponseEntity.status(HttpStatus.OK).body(costExplorerService.fetchColumnData(col));
    }

    @GetMapping("/month-wise")
    public ResponseEntity<List<MonthlyCostDTO>> getMonthWise(@RequestParam(name="groupby")
                                                                 @Pattern(
                                                                         regexp="SERVICE|INSTANCE_TYPE|USAGE_TYPE|PLATFORM|REGION|USAGE_TYPE_GROUP|PURCHASE_OPTION|API_OPERATION|RESOURCE|AVAILABILITY_ZONE|TENANCY|LEGAL_ENTITY|BILLING_ENTITY",
                                                                         message="Invalid GroupBy value"
                                                                 )
                                                                 String groupBy){
        return ResponseEntity.status(HttpStatus.OK).body(costExplorerService.fetchMonthWiseData(groupBy));
    }

    @GetMapping("/by-category")
    public ResponseEntity<List<MonthlyCategoryDTO>> getByCategory(@RequestParam(name="category")
                                                                      @Pattern(
                                                                              regexp="SERVICE|INSTANCE_TYPE|USAGE_TYPE|PLATFORM|REGION|USAGE_TYPE_GROUP|PURCHASE_OPTION|API_OPERATION|RESOURCE|AVAILABILITY_ZONE|TENANCY|LEGAL_ENTITY|BILLING_ENTITY",
                                                                              message="Invalid Category Name"
                                                                      )
                                                                      String category,
                                                                  @RequestParam(name="value")
                                                                          //for later implementation
//                                                                      @Pattern(
//                                                                              regexp = "^\\d+\\t[A-Za-z]+Instances|\\w+\\t[a-z0-9-]+\\tAWS\\t\\d{4}-\\d{2}-\\d{2}\\t\\d+\\t[\\w.]+\\t.+?\\t[\\w]+\\t[\\w]+\\t[a-z0-9-]+\\t[\\w\\-:.]+\\tAmazon [A-Za-z ]+\\t(Shared|Dedicated)\\t[\\w:-]+\\t.+?\\t\\d+$",
//                                                                              message = "Invalid value"
//                                                                      )
                                                                  String value){
        return ResponseEntity.status(HttpStatus.OK).body(costExplorerService.fetchByCategory(category,value));
    }

    @GetMapping("/account")
    public ResponseEntity<List<AccountInstanceCostDTO>> getByAccountId(@RequestParam(name="accountId")
                                                                           @Pattern(
                                                                                   regexp = "^[0-9]{4}$",
                                                                                   message = "Invalid Account Id"
                                                                           )
                                                                           String accountId){
        return ResponseEntity.status(HttpStatus.OK).body(costExplorerService.fetchByAccountId(accountId));
    }

}

