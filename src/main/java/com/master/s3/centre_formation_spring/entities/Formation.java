package com.master.s3.centre_formation_spring.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@DynamicUpdate
@Entity
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    @Enumerated(EnumType.STRING)
    private Reserve reserve = Reserve.INDIVIDU;
    private Integer heure ;
    private String name ;
    private String image ;
    private Float cout ;
    @Column(length=1000000)
    private String objectif ;
    @Column(length=1000000)
    private String programme ;
    private LocalDate date ;

    @ManyToOne(
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    private Ville ville ;

    @ManyToOne( cascade = {
            CascadeType.MERGE,
            CascadeType.PERSIST
    })
    private Userinfo userinfo ;

    @ManyToOne(
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    private Categorie categorie;

    @ManyToMany(
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    private List<Entreprise> entreprises = new ArrayList<>()  ;

    @ManyToMany(mappedBy = "formations",
            cascade = {
            CascadeType.MERGE,
            CascadeType.PERSIST
            })
    private List<Participant> participants = new ArrayList<>() ;

    public void addEntreprise(Entreprise entreprise){
        entreprises.add(entreprise);
        entreprise.getFormations().add(this);
    }

    public void removeEntreprise(Entreprise entreprise){
        entreprises.remove(entreprise);
        entreprise.getFormations().remove(this);
    }

    public void addParticipant(Participant participant){
        participants.add(participant);
        participant.getFormations().add(this);
    }

    public void removeParticipant(Participant participant){
        participants.remove(participant);
        participant.getFormations().remove(this);
    }


    /* sera appelle lorsque on supprime un utilisateur */
    @PreRemove
    private void preRemove(){
        List<Participant> utilisateursCopy = new ArrayList<>(participants);
        List<Entreprise> entreprisesCopy = new ArrayList<>(entreprises);

        if (participants != null) {
            for (Participant participant : utilisateursCopy) {
                /* desynchronisation.*/
                removeParticipant(participant);
            }
        }
        if (entreprises != null) {
            for (Entreprise entreprise : entreprisesCopy) {
                /* desynchronisation.*/
                removeEntreprise(entreprise);
            }
        }
    }
}
