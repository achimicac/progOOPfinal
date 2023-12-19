/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';

//ว่าจะมาทำcheck เพิ่มว่าถ้าไม่ใช่เจ้าของsccountให้มันrenderหน้าอื่น

export const petprofile = async (req, res, next) => {
      console.log("req.params" + req.params.petid)
      try {
            db.query("SELECT *, DATE_FORMAT(petDoB, '%d %M %Y') bd, DATE_FORMAT(petDoB, '%e %M %Y') showbd FROM Pet WHERE petID = ?", [req.params.petid], (err, result) => {
                  if (err) {
                        return console.log("Can't found this user");
                  }else{
                        const binaryData = result[0].petPfp;
                        const petPfpUrl = `data:image/jpeg;base64,${binaryData.toString('base64')}`;
                        result[0].petPfpUrl = petPfpUrl;
                        res.petinfo = result
                        console.log(res.petinfo)
                        //console.log("from petprofile.js: " + req.params.petid + " name: " + result[0].petName);
                        return next();
                  }
            })
      } catch (error) {
            throw error;
            
      }
}

//module.exports = petprofile;