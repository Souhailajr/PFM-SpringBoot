package com.master.s3.centre_formation_spring.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;


@NoArgsConstructor
@AllArgsConstructor
@Data
@DynamicUpdate
@Entity
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String support;
    private String qualite ;
    private String maitrise;
    private String rythme ;


    @ManyToOne(
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    private Participant participant;

    @ManyToOne(
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    private Userinfo userinfo ;


}
