//package com.example.backend.entity;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
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
//public class Laptop {
//
//    @Id
//    private int laptopId;
//    private String laptopModel;
//    private String brand;
//
//    //Now as there is no reference or relation with student table so from this table we cannot find any associated student
//    //So to do that we have to make relation
//    //Now this table will also have foreign key student_student_id
//
//    //As both table will have foreign key, but we can manage with single relation also
//    // by using mapped by attribute
//
//    //this student field is join column okay because this field is becoming foreign key
//    @OneToOne
//    @JoinColumn(name="student_id")
//    private Student student;
//}
