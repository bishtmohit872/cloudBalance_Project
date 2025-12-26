package com.example.backend.security;

import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor //here it can perform constructor injectiuon
public class customUserDetailService implements UserDetailsService {

    public final UserRepository userRepository;

    // below code is now perform by @RequiredArgsConstructor to perform constructor injection
    // public customUserDetailService(UserRepository userRepository){
    //     this.userRepository = userRepository;
    // }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        return userRepository.findByEmail(email).orElseThrow();
    }
}
