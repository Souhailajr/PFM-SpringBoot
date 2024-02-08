package com.master.s3.centre_formation_spring.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@DynamicUpdate
@Entity
@Table(name="user")
public class Userinfo implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String firstname ;
    private String lastname ;
    @Column(unique = true,name="email")
    //definir username pour le UserDetails
    private String username  ;
    private String phone ;
    private String password ;
    private String image ;
    private String ville ;
    @Enumerated(EnumType.STRING)
    private Role role ;
    /*formateur interne ou externe */
    private Boolean outside = false ;
    @Column(length=1000000)
    private String description ;
    @Column(length=1000000)
    private String competence ;
    @Column(length=1000000)
    private String remarque ;
    boolean active=true;


    @JsonIgnore
    @OneToMany(mappedBy = "userinfo",
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    private List<Formation> formations ;

    @JsonIgnore
    @OneToMany(mappedBy = "userinfo",
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    private List<Evaluation> evaluations;

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities=new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.toString()));
        return authorities;
    }


    @Override
    public boolean isAccountNonExpired() {return true;}
    @Override
    public boolean isAccountNonLocked() {return true;}
    @Override
    public boolean isCredentialsNonExpired() {return true;}
    @Override
    public boolean isEnabled() {return this.active;}

    /* méthodes utilitaires gestion synchronisation*/
    public void addFormation(Formation formation){
        formations.add(formation);
        formation.setUserinfo(this);
    }

    public void removeFormation(Formation formation){
        formations.add(formation);
        formation.setUserinfo(null);
    }

    public void addEvaluation(Evaluation evaluation){
        evaluations.add(evaluation);
        evaluation.setUserinfo(this);
    }

    public void removeEvaluation(Evaluation evaluation){
        evaluations.remove(evaluation);
        evaluation.setUserinfo(null);
    }

    /* @PreRemove appélé avant de supprimé l'entité courant.*/
    @PreRemove
    private void preRemove(){
        List<Formation> formationsCopy = new ArrayList<>(formations);
        List<Evaluation> evaluationsCopy = new ArrayList<>(evaluations);

        if (formations != null) {
            for (Formation formation : formationsCopy) {
                /* desynchronisation.*/
                removeFormation(formation);
            }
        }
        if (evaluations != null) {
            for (Evaluation evaluation : evaluationsCopy) {
                /* desynchronisation.*/
                removeEvaluation(evaluation);
            }
        }
    }

}
