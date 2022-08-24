package com.backend_spring.backend_spring.services.Genero;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_spring.backend_spring.models.Genero;
import com.backend_spring.backend_spring.repositories.GeneroRepository;

@Service
public class GeneroServiceImpl
        implements GeneroService {

    @Autowired
    private GeneroRepository generoRepository;

    // Guardar
    @Override
    public Genero saveGenero(Genero genero) {
        return generoRepository.save(genero);
    }

    // Leer
    @Override
    public List<Genero> fetchGeneroList() {
        return (List<Genero>) generoRepository.findAll();
    }

    // Actualizar
    @Override
    public Genero updateGenero(Genero genero, Long generoId) {

        Genero generoDB = generoRepository.findById(generoId).get();

        if (Objects.nonNull(genero.getNombre()) && !"".equalsIgnoreCase(genero.getNombre())) {
            generoDB.setNombre(genero.getNombre());
        }

        return generoRepository.save(generoDB);
    }

    // Eliminar
    @Override
    public void deleteGeneroById(Long generoId) {
        generoRepository.deleteById(generoId);
    }
}
