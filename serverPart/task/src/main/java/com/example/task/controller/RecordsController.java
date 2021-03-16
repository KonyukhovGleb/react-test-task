package com.example.task.controller;

import java.util.List;

import com.example.task.repo.RecordRepo;
import com.example.task.service.RecordService;
import com.example.task.entity.RecordEntity;

import org.springframework.stereotype.Service; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/records")
public class RecordsController {
 
    @Autowired
    private RecordService recordService;
 
    @ResponseBody
    @GetMapping("/all")
    public ResponseEntity allRecord() {
        List<RecordEntity> res = recordService.getAllRecords();
        return ResponseEntity.ok(res);
 
    }

    @PostMapping("/add")
    public ResponseEntity addRecord(@RequestBody RecordEntity record) {
 
        recordService.addRecord(record); 

        return ResponseEntity.ok("Record added.");

    }
    
    @PutMapping(value = "{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody RecordEntity record) {
        
        try {
            return ResponseEntity.ok(recordService.updateRecord(id, record));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка");
        }
        

        
        
    }
 
}