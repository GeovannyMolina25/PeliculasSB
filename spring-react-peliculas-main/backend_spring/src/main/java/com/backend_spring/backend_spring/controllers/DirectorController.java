package com.backend_spring.backend_spring.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend_spring.backend_spring.models.Director;
import com.backend_spring.backend_spring.services.Director.DirectorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DirectorController {
    @Autowired
    private DirectorService directorService;

    // Guardar
    @PostMapping("/directores")
    public Director saveDirector(@Valid @RequestBody Director director) {
        return directorService.saveDirector(director);
    }

    // Leer
    @GetMapping("/directores")
    public List<Director> fetchDirectorList() {
        return directorService.fetchDirectorList();
    }

    // Actualizar
    @PutMapping("/directores/{id}")
    public Director updateDirector(@RequestBody Director director, @PathVariable("id") Long directorId) {
        return directorService.updateDirector(director, directorId);
    }

    // Eliminar
    @DeleteMapping("/directores/{id}")
    public String deleteDirectorById(@PathVariable("id") Long directorId) {
        directorService.deleteDirectorById(directorId);
        return "Eliminado Exitosamente";
    }
}
