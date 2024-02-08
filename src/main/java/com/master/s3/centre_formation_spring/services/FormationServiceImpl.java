package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.*;
import com.master.s3.centre_formation_spring.repositories.*;
import com.master.s3.centre_formation_spring.repositories.CategorieRepository;
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
import java.time.LocalDate;
import java.util.List;

@Service
public class FormationServiceImpl implements FormationService{
    @Autowired
    private FormationRepository formationRepository ;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private EntrepriseRepository entrepriseRepository ;
    @Autowired
    private VilleRepository villeRepository ;
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private CategorieRepository categorieRepository;


    @Value("${imagePath}")
    private String chemin ;

    @Override
    public Formation findById(Long id) {
        return formationRepository.findById(id).get();
    }

    @Override
    public List<Formation> getParticipants(Long id) {
        return null;
    }

    @Override
    public Formation addFormateur(Long formateurId, Long formationId) {
        Formation formation = formationRepository.findById(formationId).get();
        Userinfo formateur = userInfoRepository.findById(formateurId).orElse(null);

        if(formateur.getRole() == Role.ROLE_FORMATEUR && formation != null)
        {
            formateur.addFormation(formation);
            return  formationRepository.save(formation);
        }

        return  null;
    }

    @Override
    public List<Formation> findAll() {
        return formationRepository.findAll();
    }

    @Override
    public List<Formation> getFormateur(Long formateurId) {
         Userinfo userinfo = userInfoRepository.findById(formateurId).get();

        return userinfo.getFormations();
    }

    @Override
    public Formation addDate(Long formationId, LocalDate date) {
        Formation formation = formationRepository.findById(formationId).orElse(null);
        if(formation != null){
            formation.setDate(date);
        }
        return formationRepository.save(formation);
    }

    @Override
    public Formation addEntreprise(Long entrepriseId, Long formationId) {
        return null;
    }

    @Override
    public Formation addListEntreprises(List<Long> entrepriseIds, Long formationId) {
        Formation formation = formationRepository.findById(formationId).get();

        if (formation != null) {

            List<Entreprise> entreprises = entrepriseRepository.findAllById(entrepriseIds);

            entreprises.forEach(entreprise -> {
                entreprise.addFormation(formation);
                formationRepository.save(formation);
            });

            return formation ;
        }

        return null;
    }

    @Override
    public Formation update(Formation formation) {
        Categorie categorie = categorieRepository.findById(formation.getCategorie().getId()).orElse(null);
        Ville ville = villeRepository.findById(formation.getVille().getId()).orElse(null);

        if(categorie != null && ville !=null){
            ville.addFormation(formation);
            categorie.addFormation(formation);
        }
        return formationRepository.save(formation);
    }


    @Override
    public Formation save(Formation formation) {
        Ville ville = villeRepository.findById(formation.getVille().getId()).orElse(null) ;
        Categorie categorie = categorieRepository.findById(formation.getCategorie().getId()).orElse(null);

        ville.addFormation(formation);
        categorie.addFormation(formation);

        return formationRepository.save(formation);
    }

    @Override
    public void deleteById(Long id) {
        formationRepository.deleteById(id);
    }

    @Override
    public void addImage(Long id, MultipartFile file) throws IOException {

        Formation formation = formationRepository.findById(id).orElse(null);

        if(formation != null){

            if(file != null && !file.isEmpty()){
                String pathPhoto = chemin +"formations/images/" + id + ".png" ;
                file.transferTo(Path.of(pathPhoto));
                String urlPhoto = "http://localhost:8080/formations/images/" + formation.getId() ;
                formation.setImage(urlPhoto);
            }

            formationRepository.save(formation) ;
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
