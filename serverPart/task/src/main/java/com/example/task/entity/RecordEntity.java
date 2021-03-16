package com.example.task.entity;

import java.util.Date;
 
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
 
@Entity
@Table(name = "RECORDS")
public class RecordEntity {
 
    @Id
    @GeneratedValue
    @Column(name = "Id", nullable = false)
    private Long id;
 
 
    @Temporal(TemporalType.DATE)
    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "tool", length = 64, nullable = false)
    private String tool;

    @Column(name = "cost", nullable = false)
    private int cost;
 
 
    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public String getTool() {
        return tool;
    }
 
    public void setTool(String tool) {
        this.tool = tool;
    }
 
    public Date getDate() {
        return date;
    }
 
    public void setDate(Date date) {
        this.date = date;
    }
    
    public int getCost() {
        return cost;
    }
 
    public void setCost(int cost) {
        this.cost = cost;
    }
}