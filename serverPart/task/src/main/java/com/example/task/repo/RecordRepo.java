package com.example.task.repo;

import java.util.Date;
import java.util.List;
 
import com.example.task.entity.RecordEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
 
@Repository
public interface RecordRepo extends CrudRepository<RecordEntity, Long> {
 
    public List<RecordEntity> findByDate(Date date);
 
    public List<RecordEntity> findByTool(String tool);
  
    public List<RecordEntity> findByCost(int cost);
}