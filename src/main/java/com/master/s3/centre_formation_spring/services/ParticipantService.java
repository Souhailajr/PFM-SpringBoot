package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.Participant;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ParticipantService {

    public Participant findById(Long id);
    public Participant findOneByUsername(String username);
    public List<Participant> findAll();
    public Participant save(Participant participant, Long formationId) ;
    public Participant inscrireFormation(Long utilisateurId, Long formationId) ;
    public Participant desinscrireFormation(Long utilisateurId, Long formationId) ;
    public void deleteById(Long id) ;
}
