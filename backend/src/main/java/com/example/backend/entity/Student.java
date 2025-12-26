//package com.example.backend.entity;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.OneToOne;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class Student {
//
//    @Id
//    private Long studentId;
//    private String studentName;
//    private String about;
//
//    //Now just focus here, in this entity you have a One-to-One relation with laptop entity. Means you can fetch laptop details from this entity,
//    //but if you did not have any relation from laptop entity then from laptop entity you cannot fetch Student details.
//    //Means it will be unidirectional relation not bidirectional relation, that is from [ Student_Entity --> Laptop_Entity ]
//    //below line will act as a foreign key in student table laptop_laptop_id
//    @OneToOne(mappedBy = "student")
//    private Laptop laptop;
//}
