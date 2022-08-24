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

import com.backend_spring.backend_spring.models.Genero;
import com.backend_spring.backend_spring.services.Genero.GeneroService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class GeneroController {
    @Autowired
    private GeneroService generoService;

    // Guardar
    @PostMapping("/generos")
    public Genero saveGenero(@Valid @RequestBody Genero genero) {
        return generoService.saveGenero(genero);
    }

    // Leer
    @GetMapping("/generos")
    public List<Genero> fetchGeneroList() {
        return generoService.fetchGeneroList();
    }

    // Actualizar
    @PutMapping("/generos/{id}")
    public Genero updateGenero(@RequestBody Genero genero, @PathVariable("id") Long generoId) {
        return generoService.updateGenero(genero, generoId);
    }

    // Eliminar
    @DeleteMapping("/generos/{id}")
    public String deleteGeneroById(@PathVariable("id") Long generoId) {
        generoService.deleteGeneroById(generoId);
        return "Eliminado Exitosamente";
    }
}
