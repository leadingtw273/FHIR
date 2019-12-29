const fs = require("fs");
const path = require("path");
const FHIR = require("./libs/FHIR");

const dataStr = fs.readFileSync(
  path.resolve(__dirname, "./testFile/Practitioner.json")
);
const data = JSON.parse(dataStr);

const practitioner = FHIR.parse(data);
// console.log("HospitalID: ", patient.HospitalID);
// console.log("UID: ", patient.UID);

// patient.HospitalID = "SDF57GH";
// patient.UID = "2sdg65asret4h63sd54cg";

// console.log("HospitalID: ", patient.HospitalID);
// console.log("UID: ", patient.UID);

// let gender = patient.gender;
// console.log('gender :', gender);
// gender = 'qwe';
// console.log('gender Orgin :', patient.gender);

console.log('practitioner.identifier :', practitioner.identifier);

// console.log(patient.resource);
// console.log(patientId);

// const Patient = FHIR.format('Patient');
// console.log(Patient);
