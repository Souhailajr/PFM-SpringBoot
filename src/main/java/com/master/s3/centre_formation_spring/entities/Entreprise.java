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
public class Entreprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String name ;
    private String phone ;
    private String address ;
    private String url ;
    @Column(unique = true)
    private String email;
    private String image ;

    @JsonIgnore
    @ManyToMany( mappedBy = "entreprises",
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST,
            })
    private List<Formation> formations = new ArrayList<>() ;

    public void addFormation(Formation formation){
        formations.add(formation);
        formation.getEntreprises().add(this);
    }

    public void removeFormation(Formation formation){
        formations.remove(formation);
        formation.getEntreprises().remove(this);
    }

    @PreRemove
    private void preRemove(){
        List<Formation> formationsCopy = new ArrayList<>(formations);

        if (formations != null) {
            for (Formation formation : formationsCopy) {
                /* on détach les synchronisation de l'entreprise avec tout les formations auquels ils est associés.*/
                removeFormation(formation);
            }
        }
    }

}
