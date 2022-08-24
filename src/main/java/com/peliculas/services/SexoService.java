package com.peliculas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peliculas.interfaceServices.ISexoService;
import com.peliculas.interfaces.ISexo;
import com.peliculas.models.Sexo;

@Service
public class SexoService implements ISexoService{

    @Autowired
    private ISexo data;

    
    @Override
    public List<Sexo> listar() {
        
        return (List<Sexo>)data.findAll();
    }

    @Override
    public Optional<Sexo> listarId(int id) {
        // TODO Auto-generated method stub
        return Optional.empty();
    }

    @Override
    public int save(Sexo s) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public void delete(int id) {
        // TODO Auto-generated method stub
        
    }
    
}
