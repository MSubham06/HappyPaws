package com.happypaws.petclinic.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class SocialCompatibility implements Serializable {

    @Column(name = "dogs")
    private String dogs;

    @Column(name = "cats")
    private String cats;

    @Column(name = "children")
    private String children;

    // Mandatory no-args constructor
    public SocialCompatibility() {
    }

    public String getDogs() {
        return dogs;
    }

    public void setDogs(String dogs) {
        this.dogs = dogs;
    }

    public String getCats() {
        return cats;
    }

    public void setCats(String cats) {
        this.cats = cats;
    }

    public String getChildren() {
        return children;
    }

    public void setChildren(String children) {
        this.children = children;
    }
}
