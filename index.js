const fs = require('fs');
const path = require('path');
const FHIR = require('./libs/FHIR');

const dataStr = fs.readFileSync(path.resolve(__dirname, './testFile/Observation.json'))
const data =JSON.parse(dataStr);

// const {id, patientId} = new Observation(data);

// console.log(id);
// console.log(patientId);

// const Patient = FHIR.format('Patient');
// console.log(Patient);


