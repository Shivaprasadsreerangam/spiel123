const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    database:"spiel",
});
app.post("/doctordetails", (req, res) => {
    const hospital_id=req.body.hospital_id;
    console.log(hospital_id);
    db.query("select doctor_name from spiel.doctor_details where hospital_id=?;",[hospital_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });

  app.post("/treatmentSteps", (req, res) => {
    const disorder_id=req.body.disorder_id;
    const patient_id=req.body.patient_id;

    
    db.query("select spd.disorder,dtd.seq_id,dtd.link_name,dtd.link from spiel.disorder_treatment_detail dtd,\
             spiel.disorder_details spd where dtd.disorder_id=spd.disorder_id \
             and dtd.disorder_id=?",[disorder_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });

  app.post("/CheckHospital", (req, res) => {
    const hospital_name=req.body.hospital_name;
  
    db.query("select count(hospital_name) count_1 from spiel.hospital_details where hospital_name=?"
        ,[hospital_name], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        if(result[0].count_1>0) {
          res.send("Account has been created alredy for this Hospital");
          console.log(result[0].hospital_name,result[0].count_1);
        }
        // console.log(result[0].count_1);
        
      }
    });
  });
  
  app.post("/getpatientdetails", (req, res) => {
    const patient_id=req.body.patient_id;
   
    db.query("select * from spiel.patient_details,spiel.patient_voice_disorder_details where patient_details.patient_id=patient_voice_disorder_details.patient_id and patient_details.patient_id=?;",[patient_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  app.post("/disorderdetails", (req, res) => {
    const hospital_id=req.body.hospital_id;
   
    db.query("select distinct disorder from spiel.disorder_details_assocation where hospital_id=?;",[hospital_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });

  app.post("/articulationSoundsAges", (req, res) => {
    const hospital_id=req.body.hospital_id;
    const dirthdayDate=req.body.dirthdayDate;
    console.log(dirthdayDate);
   
    
    // // where lower_age_months <= TIMESTAMPDIFF(MONTH, ?, CURDATE())\
    // // and upper_age_months >=TIMESTAMPDIFF(MONTH, ?, CURDATE()) \;"
    db.query("  select distinct sounds,lower_age_months,upper_age_months from spiel.articulation_sounds_ages;" ,[dirthdayDate,dirthdayDate], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });


  app.post("/userdetails", (req, res) => {
    const hospital_id=req.body.hospital_id;
   
    db.query("select first_name,name,contact_num from spiel.spiel_user where hospital_id=?;",[hospital_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });

  app.post("/insertArticulationPatientDetails", (req, res) => {
    const patient_id=req.body.patient_id;
    const first_name=req.body.first_name;
    const middle_name=req.body.middle_name;
    const last_name=req.body.last_name;
    const Gender=req.body.Gender;
    const disorder=req.body.disorder;
    const birthday=req.body.birthday;
    const Primary_Complaint=req.body.Primary_Complaint;
    const user_name=req.body.user_name;
    const middleName=req.body.middleName;
    const LastName=req.body.LastName;
    const RelationShip=req.body.RelationShip;
    const email=req.body.email;
    const contact_no=req.body.contact_no;
    const doctor=req.body.doctor;
    const hospital_id=req.body.hospital_id;
  	const deformity_articulation=req.body.deformity_articulation;
    const deformity =req.body.deformity;
    const oral_mechanism=req.body.oral_mechanism;
    const oral_mechanism_1=req.body.oral_mechanism_1;
    const articulation_assessed=req.body.articulation_assessed;
    const articulation_assessed_1=req.body.articulation_assessed_1;
    const elicit_response_1=req.body.elicit_response_1;
    const elicit_response=req.body.elicit_response;
    const errors_noticed=req.body.errors_noticed;
    const errors_noticed_1=req.body.errors_noticed_1;
    const errors_pattern=req.body.errors_pattern;
    const errors_pattern_1=req.body.errors_pattern_1;
    const diagnosis_con_sus=req.body.diagnosis_con_sus;
    const diagnosis_con_sus_1=req.body.diagnosis_con_sus_1;
    const Confirmed_Diagnosis=req.body.Confirmed_Diagnosis;
    const Suspected_Diagnosis=req.body.Suspected_Diagnosis;
    const soundsDetails=Object.values(JSON.parse(JSON.stringify(req.body.soundsDetails)));
    const PatientSoundDisorderDetails=req.body.PatientSoundDisorderDetails;
    
    console.log("Yes");
    console.log(errors_noticed);
  
const callProceudure="call spiel.insert_patient_articulation_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
db.query(callProceudure,[patient_id,first_name,middle_name,last_name,Gender,disorder,birthday,Primary_Complaint,user_name,middleName,LastName,RelationShip,
email,contact_no,'','',doctor,hospital_id,deformity_articulation,deformity,oral_mechanism,oral_mechanism,articulation_assessed,articulation_assessed_1,
elicit_response,elicit_response,errors_noticed,errors_pattern,errors_pattern_1,Confirmed_Diagnosis,Suspected_Diagnosis,'',PatientSoundDisorderDetails
],(err,result)=>{
       res.send(err);
       console.log(err);
       console.log(result);

      });
});



  app.post("/accountdetails", (req, res) => {
    const user_id=req.body.user_id;
   
    db.query("select hd.hospital_name,\
              su.first_name,\
              su.second_name,\
              su.last_name,\
              su.user_expiry_date,\
              su.contact_num,\
              su.email_id,\
              hd.nusers\
  from spiel.hospital_details hd, spiel.spiel_user su where hd.hospital_id=su.hospital_id and su.id=?;",[user_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });     

  app.post("/treatment", (req, res) => {
    const disorder_id=req.body.disorder_id;
    const patient_id=req.body.patient_id;
    const firname='shiva;'
    
    db.query("select dd.disorder,dts.trt_seq_number,dts.treatment_name,dts.num_sessions,pdt.completed_date,pdt.patient_id,dd.disorder_id \
    from  spiel.disorder_details dd,spiel.disorder_treatment_steps dts  \
    left Join spiel.patient_disorder_treatment pdt on pdt.disorder_id= ? and pdt.trt_seq_number=dts.trt_seq_number and pdt.patient_id=?\
    where dd.disorder_id=dts.disorder_id order by dts.trt_seq_number ;\
    ",[disorder_id,firname], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });




app.post("/patientdetails", (req, res) => {
  const hospital_id=req.body.hospital_id;
  const patient_id=req.body.patient_id;
  console.log(hospital_id);
    db.query("select patient_id, patient_fname,patient_disorder,disorder_id,DATE_FORMAT(patient_dob,'%Y-%m-%d') patient_dob,Caretaker_fname,email_id,contact_number1 from spiel.patient_details where hospital_id ='?';",[hospital_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
       
      }
    });
  });

  
app.post("/patientdetails_1", (req, res) => {
  const hospital_id=req.body.hospital_id;
  const patient_id=req.body.patient_id;
  console.log("patientdetails_1");
  console.log(hospital_id);
    db.query("select patient_id, patient_fname,patient_mName,patient_lName,patient_gender,patient_disorder,disorder_id,DATE_FORMAT(patient_dob,'%Y-%m-%d') patient_dob,parimary_complain,Caretaker_fname,Caretaker_mname,Caretaker_lname,realationship,email_id,contact_number1 from spiel.patient_details where hospital_id ='?' and patient_id =?;",[hospital_id,patient_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
       
      }
    });
  });

  app.post("/patientdetails_2", (req, res) => {
    const hospital_id=req.body.hospital_id;
    const patient_id=req.body.patient_id;
    console.log("patientdetails_1");
    console.log(hospital_id);
      db.query("select disorder,deformity,deformity_list,Oral_mechanism_significant,articulation_assessed,elicit_response_method,errors_noticed,pattern_errors,diagnosis_confirm_suspect,diagnosis_severity,Diagnostic_terms from spiel.patient_articulation_disorder_details where patient_id =?",[patient_id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
          console.log(result);
         
        }
      });
    });


  app.post("/fetchLoginDetails", (req, res) => {

      db.query("select login_id,email_id,hosiptal_id,max(loginTime) latest_login_time,count(login_id) num from spiel.Login_details group by login_id,email_id,hosiptal_id order by latest_login_time desc;", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
          console.log(result);
         
        }
      });
    });

  app.post("/insertLoginDetail", (req, res) => {
    const hospital_id=req.body.hospital_id;
    const login_id=req.body.login_id;
    const email_id=req.body.email_id;

    console.log(hospital_id);
      db.query("insert into spiel.Login_details(login_id,email_id,hosiptal_id,loginTime) values(?,?,?,now());",[login_id,email_id,hospital_id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
          console.log(result);
         
        }
      });
    });

    app.post("/getArticulationPatientDetails", (req, res) => {
      const patient_id=req.body.patient_id;
     
  
      console.log(patient_id);
        db.query("select sound,sound_check,disorder_level from spiel.patient_sound_disorder_details where Patient_id=?;",[patient_id] , (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
            console.log(result);
           
          }
        });
      });




app.post("/login", (req, res) => {
    const uname=req.body.uname;
    const psw=req.body.psw;
     const sqlFetch="select id,email_id,name,invalid_logins,hospital_id,role from spiel.spiel_user where (email_id=? or id =?) and pwd=? and user_expiry_date > current_date();"
     db.query(sqlFetch,[uname,uname,psw],(err,result)=>{
         res.send(result); 
         console.log(result);
});
});


app.post("/insert", (req, res) => {
    const patient_id=req.body.patient_id;
    const first_name=req.body.first_name;
    const middle_name=req.body.middle_name;
    const last_name=req.body.last_name;
    const Gender=req.body.Gender;
    const disorder=req.body.disorder;
    const birthday=req.body.birthday;
    const Primary_Complaint=req.body.Primary_Complaint;
    const user_name=req.body.user_name;
    const middleName=req.body.middleName;
    const LastName=req.body.LastName;
    const RelationShip=req.body.RelationShip;
    const email=req.body.email;
    const contact_no=req.body.contact_no;
    const doctor=req.body.doctor;
    const hospital_id=req.body.hospital_id;
    const vocal_abuse=req.body.vocal_abuse;
    const vocal_misue=req.body.vocal_misue;
    const prof_voice_user_level=req.body.prof_voice_user_level;
    const medical_etiology=req.body.medical_etiology;
    const neurogenic_disorder=req.body.neurogenic_disorder;
    const respiratory_disorders=req.body.respiratory_disorders;
    const voice_usage=req.body.voice_usage;
    const task=req.body.task;
    const grabs=req.body.grabs;
    const pitch=req.body.pitch;
    const loudness=req.body.loudness;
    const quality=req.body.quality;
    const resonance=req.body.resonance;
    const articulation=req.body.articulation;
    const prosody=req.body.prosody;
    const instrumental_analysis=req.body.instrumental_analysis;
    const instrumental_analysis1=req.body.instrumental_analysis1;
    const multi_Dimensional_Voice_Profile=req.body.multi_Dimensional_Voice_Profile;
    const praat=req.body.praat;
    const aerodynamic=req.body.aerodynamic;
    const diagnosis_terms=req.body.diagnosis_terms;
    const deformity_articulation=req.body.deformity_articulation;
    const deformity =req.body.deformity;
    const oral_mechanism=req.body.oral_mechanism;
    const oral_mechanism_1=req.body.oral_mechanism_1;
    const articulation_assessed=req.body.articulation_assessed;
    const articulation_assessed_1=req.body.articulation_assessed_1;
    const elicit_response_1=req.body.elicit_response_1;
    const errors_noticed=req.body.errors_noticed;
    const errors_noticed_1=req.body.errors_noticed_1;
    const diagnosis_con_sus=req.body.diagnosis_con_sus;
    const diagnosis_con_sus_1=req.body.diagnosis_con_sus_1;
    const Confirmed_Diagnosis=req.body.Confirmed_Diagnosis;
    const Suspected_Diagnosis=req.body.Suspected_Diagnosis;
    const soundsDetails=Object.values(JSON.parse(JSON.stringify(req.body.soundsDetails)));
    const PatientSoundDisorderDetails=req.body.PatientSoundDisorderDetails;
   

    const stringData = req.body.soundsDetails.reduce((result, item) => {
      return `${result}${item.lat},${item.lon}|`
    }, "");

    console.log(hospital_id);
  
const callProceudure="call spiel.insert_patient_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
db.query(callProceudure,[patient_id,first_name,middle_name,Gender,disorder,birthday,Primary_Complaint,user_name,middleName,LastName,RelationShip,email,contact_no,'','',doctor,hospital_id,vocal_abuse,vocal_misue,prof_voice_user_level,medical_etiology,neurogenic_disorder,respiratory_disorders,voice_usage,task,grabs,pitch,loudness,quality,resonance,articulation,prosody,instrumental_analysis,instrumental_analysis1,multi_Dimensional_Voice_Profile,praat,aerodynamic,diagnosis_terms,deformity_articulation,deformity,oral_mechanism_1,articulation_assessed_1,elicit_response_1,errors_noticed,errors_noticed_1,diagnosis_con_sus,diagnosis_con_sus_1,Confirmed_Diagnosis,Suspected_Diagnosis,PatientSoundDisorderDetails],(err,result)=>{
         res.send(err);
         console.log(err);

        });
});


app.post("/createAccount", (req, res) => {
  const hospital_id=req.body.hospital_id;
  const nusers=req.body.nusers;
  const uName=req.body.uName;
  const mName=req.body.mName;
  const lName=req.body.lName;
  const hName=req.body.hName;
  const duration=req.body.duration;
  const duration1=req.body.duration1;
  const disorder="Voice";
  const Emaild=req.body.Emaild;
  const Phno=req.body.Phno;
  

 
  


const callProceudure="call spiel.create_account(?,?,?,?,?,?,?,?,?,?,?)"
db.query(callProceudure,[hospital_id,uName,mName,lName,hName,duration,duration1,disorder,Emaild,Phno,nusers],(err,result)=>{
       res.send(err);
       console.log(err);
       console.log(result);

      });
});

app.listen(3002,()=>{
    console.log("running port 3002");
});