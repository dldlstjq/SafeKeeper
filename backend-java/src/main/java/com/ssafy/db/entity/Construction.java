package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Construction{
    @Id
    @Column(name = "construction_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long constructionId;
    // 회사이름
    @Column(name = "construction_name")
    String constructName;
}
