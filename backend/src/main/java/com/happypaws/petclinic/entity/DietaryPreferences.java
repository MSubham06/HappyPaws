package com.happypaws.petclinic.entity;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;

@Embeddable
public class DietaryPreferences {

    private String foodType;
    private Integer caloricIntakeDaily;

    @ElementCollection
    @CollectionTable(
        name = "pet_allergies",
        joinColumns = @JoinColumn(name = "pet_id")
    )
    private List<String> allergies;

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public Integer getCaloricIntakeDaily() {
        return caloricIntakeDaily;
    }

    public void setCaloricIntakeDaily(Integer caloricIntakeDaily) {
        this.caloricIntakeDaily = caloricIntakeDaily;
    }

    public List<String> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<String> allergies) {
        this.allergies = allergies;
    }
}
