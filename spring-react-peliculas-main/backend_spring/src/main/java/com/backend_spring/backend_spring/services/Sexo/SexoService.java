package com.backend_spring.backend_spring.services.Sexo;

import java.util.List;

import com.backend_spring.backend_spring.models.Sexo;



public interface SexoService {

    // Guardar
    Sexo saveSexo(Sexo sexo);

    // Leer
    List<Sexo> fetchSexoList();

    // Actulizar
    Sexo updateSexo(Sexo sexo, Long sexoId);

    // Eliminar
    void deleteSexoById(Long sexoId);
}
