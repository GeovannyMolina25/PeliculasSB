package com.peliculas.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.peliculas.interfaceServices.ISexoService;
import com.peliculas.models.Sexo;



@Controller
@RequestMapping
public class controlador {

    @Autowired
    private ISexoService service;

    @GetMapping("/listar")
    public String listar(Model model){
        List<Sexo>sexo=service.listar();
        model.addAttribute("Sexos",sexo);
        return "index";
    }
}
