package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.Formation;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface FormationService {
    public Formation findById(Long id);
    public List<Formation> getParticipants(Long id);
    public Formation addFormateur(Long formateurId,Long formationId) ;
    public List<Formation> findAll();
    public List<Formation> getFormateur(Long formateurId);
    public Formation addDate(Long formationId, LocalDate date) ;
    public Formation addEntreprise(Long entrepriseId,Long formationId) ;
    public Formation addListEntreprises(List<Long> entrepriseIds,Long formationId) ;
    public Formation update(Formation formation) ;
    public Formation save(Formation formation) ;
    public void deleteById(Long id) ;
    public void addImage(Long id,MultipartFile file) throws IOException;
    public ResponseEntity<Resource> getImage(Long id);
}
