package com.backend_spring.backend_spring.services.Director;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_spring.backend_spring.models.Director;
import com.backend_spring.backend_spring.repositories.DirectorRepository;

@Service
public class DirectorServiceImpl implements DirectorService{
    @Autowired
    private DirectorRepository directorRepository;

    // Guardar
    @Override
    public Director saveDirector(Director director) {
        return directorRepository.save(director);
    }

    // Leer
    @Override
    public List<Director> fetchDirectorList() {
        return (List<Director>) directorRepository.findAll();
    }

    // Actualizar
    @Override
    public Director updateDirector(Director director, Long directorId) {

        Director directorDB = directorRepository.findById(directorId).get();

        if (Objects.nonNull(director.getNombre()) && !"".equalsIgnoreCase(director.getNombre())) {
            directorDB.setNombre(director.getNombre());
        }

        return directorRepository.save(directorDB);
    }

    // Eliminar
    @Override
    public void deleteDirectorById(Long directorId) {
        directorRepository.deleteById(directorId);
    }
}
