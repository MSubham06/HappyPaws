package com.happypaws.petclinic.dto; // ✅ Fixed Package

public class DiseasePredictionRequest {
    private int age;
    private double weight;
    private String symptoms;

    // Constructors
    public DiseasePredictionRequest() {}
    public DiseasePredictionRequest(int age, double weight, String symptoms) {
        this.age = age;
        this.weight = weight;
        this.symptoms = symptoms;
    }

    // Getters and Setters
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }
}