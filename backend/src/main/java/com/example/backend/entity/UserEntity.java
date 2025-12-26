package com.example.backend.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    @Email
    private String email;

    @Column(unique = true)
    private String username;

    private String password;
    
    @ManyToMany(mappedBy = "users")
    private List<AwsAccountEntity> awsAccount;

    public enum Role{
        Admin,Customer,ReadOnly;

    }

    @Enumerated(EnumType.STRING)
    private Role role;

    //As springboot understand authority as a GrantedAuthority
    //That why we make GrantedAuthority Object
    // Proper equals(), hashCode(), toString() implemented here in "new SimpleGrantedAuthority"
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_"+role.name()));
    }


}





