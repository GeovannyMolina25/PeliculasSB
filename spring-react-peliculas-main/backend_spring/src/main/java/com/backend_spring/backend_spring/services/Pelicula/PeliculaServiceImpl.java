package com.backend_spring.backend_spring.services.Pelicula;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_spring.backend_spring.models.Pelicula;
import com.backend_spring.backend_spring.repositories.PeliculaRepository;

@Service
public class PeliculaServiceImpl implements PeliculaService{
    @Autowired
    private PeliculaRepository peliculaRepository;

    // Guardar
    @Override
    public Pelicula savePelicula(Pelicula pelicula) {
        return peliculaRepository.save(pelicula);
    }

    // Leer
    @Override
    public List<Pelicula> fetchPeliculaList() {
        return (List<Pelicula>) peliculaRepository.findAll();
    }

    // Actualizar
    @Override
    public Pelicula updatePelicula(Pelicula pelicula, Long peliculaId) {

        Pelicula peliculaDB = peliculaRepository.findById(peliculaId).get();

        if (Objects.nonNull(pelicula.getGen_id()) && ! (0 == pelicula.getGen_id())) {
            peliculaDB.setGen_id(pelicula.getGen_id());
        }

        if (Objects.nonNull(pelicula.getDir_id()) && ! (0 == pelicula.getDir_id())) {
            peliculaDB.setDir_id(pelicula.getDir_id());
        }

        if (Objects.nonNull(pelicula.getFor_id()) && ! (0 == pelicula.getFor_id())) {
            peliculaDB.setFor_id(pelicula.getFor_id());
        }

        if (Objects.nonNull(pelicula.getNombre()) && !"".equalsIgnoreCase(pelicula.getNombre())) {
            peliculaDB.setNombre(pelicula.getNombre());
        }

        if (Objects.nonNull(pelicula.getCosto()) && ! (0 == pelicula.getCosto())) {
            peliculaDB.setCosto(pelicula.getCosto());
        }

        if(Objects.nonNull(pelicula.getEstreno())) {
            peliculaDB.setEstreno(pelicula.getEstreno());
        }

        return peliculaRepository.save(peliculaDB);
    }

    // Eliminar
    @Override
    public void deletePeliculaById(Long peliculaId) {
        peliculaRepository.deleteById(peliculaId);
    }
}
