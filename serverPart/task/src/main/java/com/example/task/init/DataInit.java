package com.example.task.init;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
 
import com.example.task.repo.RecordRepo;
import com.example.task.entity.RecordEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
 
@Component
public class DataInit implements ApplicationRunner {
 
    private RecordRepo recordRepo;
 
    private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
 
    @Autowired
    public DataInit(RecordRepo recordRepo) {
        this.recordRepo = recordRepo;
    }
 
    @Override
    public void run(ApplicationArguments args) throws Exception {
        long count = recordRepo.count();
 
        if (count == 0) {
            
            RecordEntity r1 = new RecordEntity();
 
            r1.setTool("Jo");
 
            Date d1 = df.parse("1980-12-20");
            r1.setDate(d1);
            
            r1.setCost(222000);
            
            //
            RecordEntity r2 = new RecordEntity();
 
            r2.setTool("Sm");
            Date d2 = df.parse("1985-11-11");
            r2.setDate(d2);

            r2.setCost(222000);
 
            recordRepo.save(r1);
            recordRepo.save(r2);
        }
 
    }
     
}