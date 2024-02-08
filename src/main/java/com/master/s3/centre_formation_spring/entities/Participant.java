package com.master.s3.centre_formation_spring.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String firstname ;
    private String lastname ;
    private LocalDate datenaissance;
    private String phone ;
    @Column(unique = true,name="email")
    private String username  ;
    private String ville ;
    private String image ;
    private String password ;

    @JsonIgnore
    @OneToMany(mappedBy = "participant",
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    private List<Evaluation> evaluations = new ArrayList<>() ;

    @JsonIgnore
    @ManyToMany( cascade = {
            CascadeType.MERGE,
            CascadeType.PERSIST
    })
    private List<Formation> formations = new ArrayList<>() ;


    public void addEvaluation(Evaluation evaluation){
        evaluations.add(evaluation);
        evaluation.setParticipant(this);
    }

    public void removeEvaluation(Evaluation evaluation){
        evaluations.remove(evaluation);
        evaluation.setParticipant(null);
    }

    public void addFormation(Formation formation){
        formations.add(formation);
        formation.getParticipants().add(this);
    }

    public void removeFormation(Formation formation){
        formations.remove(formation);
        formation.getParticipants().remove(this);
    }

    /* sera appelle lorsque on supprime un utilisateur */
    @PreRemove
    private void preRemove(){
        List<Formation> formationsCopy = new ArrayList<>(formations);
        List<Evaluation> evaluationsCopy = new ArrayList<>(evaluations);

        if (formations != null) {
            for (Formation formation : formationsCopy) {
                /* on détach les synchronisation de l'utlisateur avec tout les formations auquels ils est associés.*/
                removeFormation(formation);
            }
        }

        if (evaluations != null) {
            for (Evaluation evaluation : evaluationsCopy) {
                /* on détach les synchronisation de l'utlisateur avec tout les formations auquels ils est associés.*/
                removeEvaluation(evaluation);
            }
        }
    }

}
