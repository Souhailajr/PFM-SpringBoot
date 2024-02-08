package com.master.s3.centre_formation_spring.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@DynamicUpdate
@Entity
public class Ville {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String name ;

    @JsonIgnore
    @OneToMany(mappedBy = "ville",
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    private List<Formation> formations = new ArrayList<>() ;

    /* méthodes utilitaires gestion synchronisation*/
    public void addFormation(Formation formation){
        formations.add(formation);
        formation.setVille(this);
    }

    public void removeFormation(Formation formation){
        formations.remove(formation);
        formation.setVille(null);
    }


    /* @PreRemove appélé avant de supprimé l'entité courant.*/
    @PreRemove
    private void preRemove() {

        List<Formation> formationsCopy = new ArrayList<>(formations);

        if (formations != null) {
            for (Formation formation : formationsCopy) {
                /* desynchronisation*/
               removeFormation(formation);
            }
        }


    }


}
