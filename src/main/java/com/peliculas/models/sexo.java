package com.peliculas.models;

import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;

@Entity
@Table(name = "Sexo")
public class Sexo{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String gen_nombre;

    public Sexo(){

    }

    public Sexo(int id, String gen_nombre) {
        
        this.id = id;
        this.gen_nombre = gen_nombre;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGen_nombre() {
        return gen_nombre;
    }

    public void setGen_nombre(String gen_nombre) {
        this.gen_nombre = gen_nombre;
    }

    

   
}



