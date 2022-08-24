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

import com.backend_spring.backend_spring.models.Alquiler;
import com.backend_spring.backend_spring.services.Alquiler.AlquilerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AlquilerController {
    @Autowired
    private AlquilerService alquilerService;

    // Guardar
    @PostMapping("/alquilers")
    public Alquiler saveAlquiler(@Valid @RequestBody Alquiler alquiler) {
        return alquilerService.saveAlquiler(alquiler);
    }

    // Leer
    @GetMapping("/alquilers")
    public List<Alquiler> fetchAlquilerList() {
        return alquilerService.fetchAlquilerList();
    }

    // Actualizar
    @PutMapping("/alquilers/{id}")
    public Alquiler updateAlquiler(@RequestBody Alquiler alquiler, @PathVariable("id") Long alquilerId) {
        return alquilerService.updateAlquiler(alquiler, alquilerId);
    }

    // Eliminar
    @DeleteMapping("/alquilers/{id}")
    public String deleteAlquilerById(@PathVariable("id") Long alquilerId) {
        alquilerService.deleteAlquilerById(alquilerId);
        return "Eliminado Exitosamente";
    }
}