/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';
import { Blob } from 'buffer';

//ว่าจะมาทำcheck เพิ่มว่าถ้าไม่ใช่เจ้าของsccountให้มันrenderหน้าอื่น

export const petEdit = async (req, res, next) => {
      
      const { petName, petType, petDoB, petPfp, petGender} = req.body;
      console.log("pet Edit \n" + petPfp.dataUrl)
      const binaryData = Buffer.from(petPfp.dataUrl.split(',')[1], 'base64'); 
      const formattedDate = new Date(petDoB).toISOString().substring(0, 10);

      try {
            db.query('UPDATE Pet SET ? WHERE petID = ?', [{petName: petName, petType: petType, petDoB: formattedDate, petPfp: binaryData, petGender: petGender}, req.params.petid], (err, result) => {
                  if (err) {
                        console.log("Can't Edit pet inform" + petName , petDoB);
                        console.log(err);
                        res.json({error: "success", error: "Edit " + petName + " is not success"});
                  }else{
                        console.log("Edit pet inform success");
                        res.json({status: "success", success: "Edit Success"});
                  }
            })
      } catch (error) {
            console.log(error);
            
      }
}

//module.exports = petEdit;