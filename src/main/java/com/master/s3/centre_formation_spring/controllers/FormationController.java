package com.master.s3.centre_formation_spring.controllers;
import com.master.s3.centre_formation_spring.entities.Evaluation;
import com.master.s3.centre_formation_spring.entities.Formation;
import com.master.s3.centre_formation_spring.entities.Formation;
import com.master.s3.centre_formation_spring.repositories.FormationRepository;
import com.master.s3.centre_formation_spring.services.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/formations")
@CrossOrigin
public class FormationController{

    @Autowired
    private FormationService formationService ;

    @GetMapping("/{id}")
    public Formation findById(@PathVariable Long id) {
        return formationService.findById(id);
    }
    @GetMapping
    public List<Formation> findAll() {
        return formationService.findAll();
    }

    @PostMapping("/date-planification")
    public Formation planification(@RequestParam LocalDate date,@RequestParam Long id ) {
        return formationService.addDate(id,date);
    }
    @PostMapping ("/add-formateur")
    public Formation addFormateur(@RequestParam Long formateurId,@RequestParam Long formationId) {
        return formationService.addFormateur(formateurId,formationId);
    }

    @PostMapping ("/add-entreprises")
    public Formation addListEntreprises(@RequestParam List<Long> entrepriseIds, @RequestParam Long formationId) {
        return formationService.addListEntreprises(entrepriseIds,formationId);
    }

    @PostMapping
    public Formation save(@RequestBody Formation formation) {
        return formationService.save(formation);
    }

    @PutMapping
    public Formation update(@RequestBody Formation formation) {
        return formationService.update(formation);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
         formationService.deleteById(id);
    }
    @PostMapping("/image")
    public void addImage(
            @RequestParam("id") Long id,
            @RequestParam(required = false,value="image") MultipartFile file

    ) throws IOException {

        formationService.addImage(id,file);
    }

    @GetMapping("/formateur/{id}")
    public List<Formation> getFormateur(@PathVariable Long id) {
        return formationService.getFormateur(id);
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<Resource> getImage(@PathVariable Long id){
        return formationService.getImage(id);
    }

}
