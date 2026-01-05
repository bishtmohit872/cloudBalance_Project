package com.example.backend.controller;

import com.example.backend.DTO.requestDTO.AddAwsOnboardRequestDTO;
import com.example.backend.DTO.responseDTO.AwsOnboardResponseDTO;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AwsOnboardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/onboard")
public class AwsOnboardController {

    Map<String,Boolean> map = new HashMap<>();

    @Autowired
    AwsOnboardService awsOnboardService;

    @Autowired
    UserRepository userRepository;

    @GetMapping()
    public ResponseEntity<List<AwsOnboardResponseDTO>> getOnboardAccount(){
        List<AwsOnboardResponseDTO> onboardList = awsOnboardService.getAllOnboardAccount();
        return ResponseEntity.status(HttpStatus.OK).body(onboardList);
    }


    @PostMapping()
    public ResponseEntity<AwsOnboardResponseDTO> submitOnboardData(@Valid @RequestBody AddAwsOnboardRequestDTO addAwsOnboardRequestDTO){
        AwsOnboardResponseDTO awsOnboardResponseDTO = awsOnboardService.saveOnboardData(addAwsOnboardRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(awsOnboardResponseDTO);
    }

    @PostMapping("/assign/{userId}/aws-accounts")
    public ResponseEntity<Object> assignAWSAccount(@Valid @PathVariable(name="userId") Long userId, @RequestBody List<AddAwsOnboardRequestDTO> addAwsOnboardRequestDTOS){
        awsOnboardService.assignAWSAccountToUserAccount(userId, addAwsOnboardRequestDTOS );
        map.clear();
        map.put("status",true);
        return ResponseEntity.status(HttpStatus.OK).body(map);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<AwsOnboardResponseDTO>> getAwsAccountByUser(@PathVariable(name="email") String email){
        List<AwsOnboardResponseDTO> awsOnboardResponseDTOList = awsOnboardService.getAwsAccountByUserEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(awsOnboardResponseDTOList);
    }


}
