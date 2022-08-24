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

import com.backend_spring.backend_spring.models.Formato;
import com.backend_spring.backend_spring.services.Formato.FormatoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class FormatoController {
    @Autowired
    private FormatoService formatoService;

    // Guardar
    @PostMapping("/formatos")
    public Formato saveFormato(@Valid @RequestBody Formato formato) {
        return formatoService.saveFormato(formato);
    }

    // Leer
    @GetMapping("/formatos")
    public List<Formato> fetchFormatoList() {
        return formatoService.fetchFormatoList();
    }

    // Actualizar
    @PutMapping("/formatos/{id}")
    public Formato updateFormato(@RequestBody Formato formato, @PathVariable("id") Long formatoId) {
        return formatoService.updateFormato(formato, formatoId);
    }

    // Eliminar
    @DeleteMapping("/formatos/{id}")
    public String deleteFormatoById(@PathVariable("id") Long formatoId) {
        formatoService.deleteFormatoById(formatoId);
        return "Eliminado Exitosamente";
    }
}
