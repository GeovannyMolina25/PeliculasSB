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

import com.backend_spring.backend_spring.models.Pelicula;
import com.backend_spring.backend_spring.services.Pelicula.PeliculaService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PeliculaController {
    @Autowired
    private PeliculaService peliculaService;

    // Guardar
    @PostMapping("/peliculas")
    public Pelicula savePelicula(@Valid @RequestBody Pelicula pelicula) {
        return peliculaService.savePelicula(pelicula);
    }

    // Leer
    @GetMapping("/peliculas")
    public List<Pelicula> fetchPeliculaList() {
        return peliculaService.fetchPeliculaList();
    }

    // Actualizar
    @PutMapping("/peliculas/{id}")
    public Pelicula updatePelicula(@RequestBody Pelicula pelicula, @PathVariable("id") Long peliculaId) {
        return peliculaService.updatePelicula(pelicula, peliculaId);
    }

    // Eliminar
    @DeleteMapping("/peliculas/{id}")
    public String deletePeliculaById(@PathVariable("id") Long peliculaId) {
        peliculaService.deletePeliculaById(peliculaId);
        return "Eliminado Exitosamente";
    }
}