const fs = require('fs');
const path = require('path');
const Observation = require('./libs/Observation');

const dataStr = fs.readFileSync(path.resolve(__dirname, './testFile/Observation.json'))
const data =JSON.parse(dataStr);

const {id, patientId} = new Observation(data);

console.log(id);
console.log(patientId);
