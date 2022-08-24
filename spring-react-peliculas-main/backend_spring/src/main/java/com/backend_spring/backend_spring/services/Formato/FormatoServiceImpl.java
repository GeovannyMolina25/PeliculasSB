package com.backend_spring.backend_spring.services.Formato;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_spring.backend_spring.models.Formato;
import com.backend_spring.backend_spring.repositories.FormatoRepository;

@Service
public class FormatoServiceImpl implements FormatoService{
    @Autowired
    private FormatoRepository formatoRepository;

    // Guardar
    @Override
    public Formato saveFormato(Formato formato) {
        return formatoRepository.save(formato);
    }

    // Leer
    @Override
    public List<Formato> fetchFormatoList() {
        return (List<Formato>) formatoRepository.findAll();
    }

    // Actualizar
    @Override
    public Formato updateFormato(Formato formato, Long formatoId) {

        Formato formatoDB = formatoRepository.findById(formatoId).get();

        if (Objects.nonNull(formato.getNombre()) && !"".equalsIgnoreCase(formato.getNombre())) {
            formatoDB.setNombre(formato.getNombre());
        }

        return formatoRepository.save(formatoDB);
    }

    // Eliminar
    @Override
    public void deleteFormatoById(Long formatoId) {
        formatoRepository.deleteById(formatoId);
    }
}
