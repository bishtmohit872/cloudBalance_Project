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
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class AwsOnboardService {

    @Autowired
    AwsAccountRepository awsAccountRepository;

    @Autowired
    UserRepository userRepository;


    public List<AwsOnboardResponseDTO> getAllOnboardAccount(){
        List<AwsAccountEntity> awsAccountEntity = awsAccountRepository.findAll();
        List<AwsOnboardResponseDTO> awsOnboardResponseDTOList = awsAccountEntity.stream().map((awsAccount)->Transformer.AwsAccountEntitytoAwsOnboardResponseDTO(awsAccount)).collect(Collectors.toList());
        return awsOnboardResponseDTOList;
    }

    public AwsOnboardResponseDTO saveOnboardData(AddAwsOnboardRequestDTO addAwsOnboardRequestDTO){
        AwsAccountEntity awsAccountEntity = Transformer.AddOnboardRequestDTOtoAwsAccountEntity(addAwsOnboardRequestDTO);
        awsAccountRepository.save(awsAccountEntity);
        return Transformer.AwsAccountEntitytoAwsOnboardResponseDTO(awsAccountEntity);
    }

    public void assignAWSAccountToUserAccount(Long userId, List<AddAwsOnboardRequestDTO> addAwsOnboardRequestDTO){
        UserEntity user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("No Such User Found"));

        if(user.getAwsAccount()==null){
           user.setAwsAccount(new ArrayList<>());
        }

        if(addAwsOnboardRequestDTO.size()!=0){

            List<AwsAccountEntity> awsAccountEntities = addAwsOnboardRequestDTO.stream().map((entity)->Transformer.AddOnboardRequestDTOtoAwsAccountEntity(entity)).collect(Collectors.toList());

            System.out.println("entering for assigning account");

            List<AwsAccountEntity> newAwsAccountEntity = new ArrayList<>();

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

                newAwsAccountEntity.add(awsAccount);

            }

            for(AwsAccountEntity oldAwsAccountEntity :  user.getAwsAccount()){
                if( !(newAwsAccountEntity.contains(oldAwsAccountEntity)) ){
                    oldAwsAccountEntity.getUsers().remove(user);
                }
            }
            awsAccountRepository.saveAll(user.getAwsAccount());
        }

        else if(addAwsOnboardRequestDTO==null || addAwsOnboardRequestDTO.size()==0 || addAwsOnboardRequestDTO.isEmpty()){
            for(AwsAccountEntity awsAccountEntity : user.getAwsAccount()){
                awsAccountEntity.getUsers().remove(user);
            }
            user.getAwsAccount().clear();
            userRepository.save(user);
            return;
        }
    }


    public List<AwsOnboardResponseDTO> getAwsAccountByUserEmail(String email){
        UserEntity user = userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("Email not found"));
        if(user.getAwsAccount().size()==0){
            return new ArrayList<>();
        }
        List<AwsOnboardResponseDTO> awsOnboardResponseDTO = user.getAwsAccount().stream().map((account)-> Transformer.AwsAccountEntitytoAwsOnboardResponseDTO(account)).collect(Collectors.toList());
        return awsOnboardResponseDTO;
    }
}
