package com.example.backend.service;

import com.example.backend.DTO.requestDTO.AddUserRequestDTO;
import com.example.backend.DTO.requestDTO.EditUserRequestDTO;
import com.example.backend.DTO.responseDTO.UserResponseDTO;
import com.example.backend.entity.UserEntity;
import com.example.backend.exception.ElementNotFound;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.Transformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

//    StudentRepository studentRepository;
//    LaptopRepository laptopRepository;


//    public List<UserResponseDTO> getUserByCondiition(){
//        List<UserEntity> users = userRepository.findByLastname("yadav");
//        List<UserResponseDTO> allUsers = users.stream().map(user->Transformer.UserEntitytoUserResponseDTO(user)).collect(Collectors.toList());
//        return allUsers;
//    }

//    public void getUserUpdate(){
//        userRepository.updateFirstnameWithId("sonali",5L);
//    }

//    public List<UserResponseDTO> getUsers(){
//        List<UserEntity> users = userRepository.findByUsernameContaining("sh");
//        List<UserResponseDTO> allUsers = users.stream().map(user->Transformer.UserEntitytoUserResponseDTO(user)).collect(Collectors.toList());
//        return allUsers;
//    }

    public List<UserResponseDTO> getAllUsers(){
        List<UserEntity> users = userRepository.findAll();
        List<UserResponseDTO> allUsers = users.stream().map(user->Transformer.UserEntitytoUserResponseDTO(user)).collect(Collectors.toList());
        return allUsers;
    }

    public UserResponseDTO getUserById(Long id){
        UserEntity user =  userRepository.findById(id).orElseThrow(); //ByDefault NoSuchElementException is given by orElseThrow()
        return Transformer.UserEntitytoUserResponseDTO(user);
    }

    public void addUserDetails(AddUserRequestDTO addUserRequestDTO){
        userRepository.save(Transformer.AddUserRequestDTOtoAddUserEntity(addUserRequestDTO));
    }

    public UserResponseDTO editUserDetails(EditUserRequestDTO editUserRequestDTO, Long userId){

        UserEntity oldUser = userRepository.findById(userId).orElse(null);
        if(oldUser !=null){
            oldUser.setFirstName(editUserRequestDTO.getFirstName()!=null && !editUserRequestDTO.getFirstName().isBlank() ? editUserRequestDTO.getFirstName() : oldUser.getFirstName() );
            oldUser.setLastName(editUserRequestDTO.getLastName()!=null && !editUserRequestDTO.getLastName().isBlank() ? editUserRequestDTO.getLastName() : oldUser.getLastName());
            oldUser.setEmail(editUserRequestDTO.getEmail()!=null && !editUserRequestDTO.getEmail().isBlank() ? editUserRequestDTO.getEmail() : oldUser.getEmail() );
            oldUser.setRole(editUserRequestDTO.getRole()!=null && !editUserRequestDTO.getRole().isBlank() ? UserEntity.Role.valueOf(editUserRequestDTO.getRole()) : oldUser.getRole());
            userRepository.save(oldUser);
            System.out.println(oldUser);
            return Transformer.UserEntitytoUserResponseDTO(oldUser);
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
