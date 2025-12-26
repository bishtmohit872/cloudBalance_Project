package com.example.backend.exception;

public class ElementNotFound extends RuntimeException{
    public ElementNotFound(String message){
        super(message);
    }
}
