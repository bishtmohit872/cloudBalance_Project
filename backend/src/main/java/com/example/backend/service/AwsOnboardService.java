package com.example.backend.service;

import com.example.backend.DTO.requestDTO.AddAwsOnboardRequestDTO;
import com.example.backend.DTO.responseDTO.AwsOnboardResponseDTO;
import com.example.backend.entity.AwsAccountEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.AwsAccountRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.Transformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AwsOnboardService {

    @Autowired
    AwsAccountRepository awsAccountRepository;

    @Autowired
    UserRepository userRepository;


    public List<AwsOnboardResponseDTO> getAllOnboardAccount(){
        List<AwsAccountEntity> awsAccountEntity = awsAccountRepository.findAll();
        List<AwsOnboardResponseDTO> awsOnboardResponseDTOList = awsAccountEntity.stream().map((awsAccount)->Transformer.AwsAccountEntitytoOnboardResponseDTO(awsAccount)).collect(Collectors.toList());
        return awsOnboardResponseDTOList;
    }

    public AwsOnboardResponseDTO saveOnboardData(AddAwsOnboardRequestDTO addAwsOnboardRequestDTO){
        AwsAccountEntity awsAccountEntity = Transformer.AddOnboardRequestDTOtoAwsAccountEntity(addAwsOnboardRequestDTO);
        awsAccountRepository.save(awsAccountEntity);
        return Transformer.AwsAccountEntitytoOnboardResponseDTO(awsAccountEntity);
    }

    public void assignAWSAccountToUserAccount(Long userId, List<AddAwsOnboardRequestDTO> addAwsOnboardRequestDTO){
        UserEntity user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("No Such User Found"));

        if(user.getAwsAccount()==null){
           user.setAwsAccount(new ArrayList<>());
        }

        List<AwsAccountEntity> awsAccountEntities = addAwsOnboardRequestDTO.stream().map((entity)->Transformer.AddOnboardRequestDTOtoAwsAccountEntity(entity)).collect(Collectors.toList());

        System.out.println("entering for assigning account");

        for(AwsAccountEntity awsAccountEntity : awsAccountEntities){
            AwsAccountEntity awsAccount = awsAccountRepository.findByAccountArn(awsAccountEntity.getAccountArn()).orElseThrow(()->new RuntimeException("Aws Acount Not Found"));

            if(awsAccount.getUsers()==null){
                System.out.println("null here");
                awsAccount.setUsers(new ArrayList<>());
            }

            if(!awsAccount.getUsers().contains(user)){
                awsAccount.getUsers().add(user);
            }

            if(!user.getAwsAccount().contains(awsAccount)){
                user.getAwsAccount().add(awsAccount);
            }

        }
        awsAccountRepository.saveAll(user.getAwsAccount());
    }
}
