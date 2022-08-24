package com.backend_spring.backend_spring.services.Sexo;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_spring.backend_spring.models.Sexo;
import com.backend_spring.backend_spring.repositories.SexoRepository;

@Service
public class SexoServiceImpl implements SexoService {

    @Autowired
    private SexoRepository sexoRepository;

    // Guardar
    @Override
    public Sexo saveSexo(Sexo sexo) {
        return sexoRepository.save(sexo);
    }

    // Leer
    @Override
    public List<Sexo> fetchSexoList() {
        return (List<Sexo>) sexoRepository.findAll();
    }

    // Actualizar
    @Override
    public Sexo updateSexo(Sexo sexo, Long sexoId) {

        Sexo sexoDB = sexoRepository.findById(sexoId).get();

        if (Objects.nonNull(sexo.getNombre()) && !"".equalsIgnoreCase(sexo.getNombre())) {
            sexoDB.setNombre(sexo.getNombre());
        }

        return sexoRepository.save(sexoDB);
    }

    // Eliminar
    @Override
    public void deleteSexoById(Long sexoId) {
        sexoRepository.deleteById(sexoId);
    }
}
