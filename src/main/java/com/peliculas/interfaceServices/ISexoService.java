package com.peliculas.interfaceServices;
import java.util.List;
import java.util.Optional;
import com.peliculas.models.Sexo;



public interface ISexoService {
    public List<Sexo>listar();
    public Optional<Sexo>listarId(int id);
    public int save(Sexo s);
    public void delete(int id);
    
}
