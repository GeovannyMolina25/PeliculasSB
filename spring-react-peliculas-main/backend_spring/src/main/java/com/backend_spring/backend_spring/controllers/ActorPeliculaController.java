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

import com.backend_spring.backend_spring.models.ActorPelicula;
import com.backend_spring.backend_spring.services.ActorPelicula.ActorPeliculaService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ActorPeliculaController {
    @Autowired
    private ActorPeliculaService actorpeliculaService;

    // Guardar
    @PostMapping("/actorpeliculas")
    public ActorPelicula saveActorPelicula(@Valid @RequestBody ActorPelicula actorpelicula) {
        return actorpeliculaService.saveActorPelicula(actorpelicula);
    }

    // Leer
    @GetMapping("/actorpeliculas")
    public List<ActorPelicula> fetchActorPeliculaList() {
        return actorpeliculaService.fetchActorPeliculaList();
    }

    // Actualizar
    @PutMapping("/actorpeliculas/{id}")
    public ActorPelicula updateActorPelicula(@RequestBody ActorPelicula actorpelicula, @PathVariable("id") Long actorpeliculaId) {
        return actorpeliculaService.updateActorPelicula(actorpelicula, actorpeliculaId);
    }

    // Eliminar
    @DeleteMapping("/actorpeliculas/{id}")
    public String deleteActorPeliculaById(@PathVariable("id") Long actorpeliculaId) {
        actorpeliculaService.deleteActorPeliculaById(actorpeliculaId);
        return "Eliminado Exitosamente";
    }
}