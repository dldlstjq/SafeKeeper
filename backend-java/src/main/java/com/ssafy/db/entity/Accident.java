package com.ssafy.db.entity;

import javax.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Accident {
    @Id
    @Column(name = "accident_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long accidentId;

    @Column(name = "accident_type")
    String accidentType;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "accident_date", nullable = false)
    Date accidentDate;

    @Column(name  = "accident_description")
    String accidentDescription;

    @Column(name = "accident_picture")
    String accidentPicture;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "camera_id")
    Camera camera;

    @Builder
    public Accident(Long accidentId, String accidentType, Date accidentDate, String accidentDescription, String accidentPicture, Camera camera){
        this.accidentId = accidentId;
        this.accidentType = accidentType;
        this.accidentDate =accidentDate;
        this.accidentDescription = accidentDescription;
        this.accidentPicture = accidentPicture;
        this.camera = camera;

    }
}
