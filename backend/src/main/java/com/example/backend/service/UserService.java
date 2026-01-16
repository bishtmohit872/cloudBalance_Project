package com.example.backend.service;

import com.example.backend.DTO.requestDTO.AddAwsOnboardRequestDTO;
import com.example.backend.DTO.requestDTO.AddUserRequestDTO;
import com.example.backend.DTO.requestDTO.EditUserRequestDTO;
import com.example.backend.DTO.responseDTO.UserResponseDTO;
import com.example.backend.entity.UserEntity;
import com.example.backend.exception.ElementNotFound;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.Transformer;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AwsOnboardService awsOnboardService;


    public List<UserResponseDTO> getAllUsers(){
        List<UserEntity> users = userRepository.findAll();
        List<UserResponseDTO> allUsers = users.stream().map(user->Transformer.userEntitytoUserResponseDTO(user)).collect(Collectors.toList());
        return allUsers;
    }

    public UserResponseDTO getUserById(Long id){
        UserEntity user =  userRepository.findById(id).orElseThrow(); //ByDefault NoSuchElementException is given by orElseThrow()
        return Transformer.userEntitytoUserResponseDTO(user);
    }

    @Transactional
    public void addUserDetails(AddUserRequestDTO addUserRequestDTO){
        userRepository.save(Transformer.AddUserRequestDTOtoAddUserEntity(addUserRequestDTO));
        UserEntity user = userRepository.findByEmail(addUserRequestDTO.getEmail()).orElse(null);

//        if( !(user==null) && (addUserRequestDTO.getAddAwsOnboardAccounts().size()!=0) ){
        if(!(user==null)){
            System.out.println("addUserDetails:"+user);
            awsOnboardService.assignAWSAccountToUserAccount(user.getId(),addUserRequestDTO.getAddAwsOnboardAccounts());
        }
    }

    @Transactional
    public UserResponseDTO editUserDetails(EditUserRequestDTO editUserRequestDTO, Long userId){

        UserEntity oldUser = userRepository.findById(userId).orElse(null);
        System.out.println("userService:"+oldUser);

        if(oldUser !=null){
            oldUser.setFirstName(editUserRequestDTO.getFirstName()!=null && !editUserRequestDTO.getFirstName().isBlank() ? editUserRequestDTO.getFirstName() : oldUser.getFirstName() );
            oldUser.setLastName(editUserRequestDTO.getLastName()!=null && !editUserRequestDTO.getLastName().isBlank() ? editUserRequestDTO.getLastName() : oldUser.getLastName());
            oldUser.setEmail(editUserRequestDTO.getEmail()!=null && !editUserRequestDTO.getEmail().isBlank() ? editUserRequestDTO.getEmail() : oldUser.getEmail() );
            oldUser.setRole(editUserRequestDTO.getRole()!=null && !editUserRequestDTO.getRole().isBlank() ? UserEntity.Role.valueOf(editUserRequestDTO.getRole()) : oldUser.getRole());

            awsOnboardService.assignAWSAccountToUserAccount(oldUser.getId(), editUserRequestDTO.getAddAwsOnboardAccounts());
//            if(editUserRequestDTO.getAddAwsOnboardAccounts().size()!=0){
//            }
            System.out.println("userService: olduserSave");
            userRepository.save(oldUser);
            return Transformer.userEntitytoUserResponseDTO(oldUser);
        }


        throw new ElementNotFound("No Such user found with this id:"+userId);
    }

    public void deleteUserById(Long Id){
        if(!userRepository.existsById(Id)){
            throw new UsernameNotFoundException("User not found");
        }
        userRepository.deleteById(Id);
    }

    public void deleteAllUsers(){
        userRepository.deleteAll();
    }


}
