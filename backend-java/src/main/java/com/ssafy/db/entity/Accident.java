package com.ssafy.db.entity;

import javax.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter
public class Accident {
    @Id
    @Column(name = "accident_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long accidentId;

    @Column(name = "accident_type")
    String accidentType;

    @Temporal(TemporalType.DATE)
    @Column(name = "accident_date", nullable = false)
    Date accidentDate;

    @Column(name  = "accident_description")
    String accidentDescription;

    @Column(name = "accident_picture")
    String accidentPicture;
}
