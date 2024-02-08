package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.Entreprise;
import com.master.s3.centre_formation_spring.entities.Formation;
import com.master.s3.centre_formation_spring.repositories.EntrepriseRepository;
import com.master.s3.centre_formation_spring.repositories.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@Service
public class EntrepriseServiceImpl implements EntrepriseService {
    @Autowired
    private EntrepriseRepository entrepriseRepository ;
    @Autowired
    private FormationRepository formationRepository ;

    @Value("${imagePath}")
    private String chemin ;

    @Override
    public Entreprise findById(Long id) {
        return entrepriseRepository.findById(id).orElse(null);
    }

    @Override
    public Entreprise save(Entreprise entreprise) {
        return entrepriseRepository.save(entreprise);
    }

    @Override
    public Entreprise update(Entreprise entreprise) {
        return entrepriseRepository.save(entreprise);
    }

    @Override
    public void deleteById(Long id) {
        entrepriseRepository.deleteById(id);
    }

    @Override
    public List<Entreprise> findAll() {
        return entrepriseRepository.findAll();
    }

    @Override
    public void addImage(Long id, MultipartFile file) throws IOException {

        Entreprise entreprise = entrepriseRepository.findById(id).orElse(null);

        if(entreprise != null){

            if(file != null && !file.isEmpty()){
                String pathPhoto = chemin +"entreprises/images/" + id + ".png" ;
                file.transferTo(Path.of(pathPhoto));
                String urlPhoto = "http://localhost:8080/entreprises/images/" + entreprise.getId() ;
                entreprise.setImage(urlPhoto);
            }

            entrepriseRepository.save(entreprise) ;
        }
    }

    @Override
    public ResponseEntity<Resource> getImage(Long id){
        String path = chemin + id + ".png";
        FileSystemResource file = new FileSystemResource(path);
        if(!file.exists()){
            return ResponseEntity.notFound().build();
        }
        return  ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(file) ;
    }

}
