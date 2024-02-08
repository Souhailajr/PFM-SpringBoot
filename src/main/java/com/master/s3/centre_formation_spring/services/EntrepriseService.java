package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.Entreprise;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface EntrepriseService {
    public Entreprise findById(Long id);
    public Entreprise save(Entreprise entreprise) ;
    public Entreprise update(Entreprise entreprise) ;
    public void deleteById(Long id) ;
    public List<Entreprise> findAll();
    public void addImage(Long id, MultipartFile file) throws IOException;
    public ResponseEntity<Resource> getImage(Long id);
}
