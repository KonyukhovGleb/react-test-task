package com.example.task.service;

import com.example.task.exception.RecordNotFoundException;
import com.example.task.repo.RecordRepo;
import com.example.task.entity.RecordEntity;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service; 
import org.springframework.beans.factory.annotation.Autowired; 

@Service
public class RecordService {

    @Autowired
    private RecordRepo recordRepo;

    public List<RecordEntity> getAllRecords() {
        List<RecordEntity> result = new ArrayList<RecordEntity>();
        recordRepo.findAll().forEach(result::add);
        return result;

    }

    public RecordEntity addRecord(RecordEntity record) {
        return recordRepo.save(record);
    }

    public RecordEntity updateRecord(Long id, RecordEntity record) throws RecordNotFoundException {
        RecordEntity currentRecord = recordRepo.findById(id).get();

        if (currentRecord == null) {
            throw new RecordNotFoundException("Record not found");
        }

        currentRecord.setId(record.getId());
        currentRecord.setDate(record.getDate());
        currentRecord.setTool(record.getTool());
        currentRecord.setCost(record.getCost());

        recordRepo.save(currentRecord);
        return record;
    }
}
