package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.Formation;
import com.master.s3.centre_formation_spring.entities.Participant;
import com.master.s3.centre_formation_spring.repositories.FormationRepository;
import com.master.s3.centre_formation_spring.repositories.ParticipantRepository;
import com.master.s3.centre_formation_spring.repositories.VilleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@Service
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private VilleRepository villeRepository ;
    @Autowired
    private FormationRepository formationRepository ;

    @Override
    public Participant findById(Long id) {
        return participantRepository.findById(id).orElse(null);
    }

    @Override
    public Participant findOneByUsername(String username) {
        return participantRepository.findOneByUsername(username);
    }

    @Override
    public List<Participant> findAll() {
        return participantRepository.findAll();
    }

    @Override
    public Participant save(Participant participant, Long formationId) {
        Formation formation = formationRepository.findById(formationId).get();
        if(formation !=null){
            formation.addParticipant(participant);
        }
        return participantRepository.save(participant);
    }

    @Override
    public Participant inscrireFormation(Long utilisateurId, Long formationId) {
        return null;
    }

    @Override
    public Participant desinscrireFormation(Long utilisateurId, Long formationId) {
        return null;
    }

    @Override
    public void deleteById(Long id) {
            participantRepository.deleteById(id);
    }

}
