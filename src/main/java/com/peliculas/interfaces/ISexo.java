package com.peliculas.interfaces;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.peliculas.models.Sexo;

@Repository
public interface ISexo extends CrudRepository<Sexo,Integer>{
    
}
