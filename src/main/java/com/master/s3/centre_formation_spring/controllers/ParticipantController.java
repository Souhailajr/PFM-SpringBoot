package com.master.s3.centre_formation_spring.controllers;

import com.master.s3.centre_formation_spring.entities.Participant;
import com.master.s3.centre_formation_spring.services.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participants")
@CrossOrigin
public class ParticipantController {
    @Autowired
    private ParticipantService participantService;

    @GetMapping("/{id}")
    public Participant findById(@PathVariable Long id) {
        return participantService.findById(id);
    }
    @GetMapping
    public List<Participant> findAll() {
        return participantService.findAll();
    }

    @PostMapping
    public Participant save(@RequestBody Participant participant,@RequestParam Long formationId) {
        return participantService.save(participant,formationId);
    }

    @GetMapping("/findOneByUsername")
    public Participant findOneByUsername(@RequestParam String email) {
        return participantService.findOneByUsername(email);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        participantService.deleteById(id);
    }

}
