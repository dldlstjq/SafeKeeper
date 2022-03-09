package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class Construction{
    @Id
    @Column(name = "construction_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long constructionId;
    // 회사이름
    @Column(name = "construction_name", nullable = false)
    String constructName;

    @Builder
    public Construction(Long constructionId, String constructName){
        this.constructionId = constructionId;
        this.constructName = constructName;
    }
}
