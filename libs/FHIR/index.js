const Patient = require('./Patient');
const Practitioner = require('./Practitioner');
const Encounter = require('./Encounter');
const ServiceRequest = require('./ServiceRequest');
const Observation = require('./Observation');

module.exports = class Parse {
  static getResource(resource) {
    switch(resource.resourceType) {
      case 'Patient': 
        return new Patient(resource);
      case 'Practitioner': 
        return new Practitioner(resource);
      case 'Encounter': 
        return new Encounter(resource);
      case 'ServiceRequest': 
        return new ServiceRequest(resource);
      case 'Observation': 
        return new Observation(resource);
      default: 
        throw new Error('can\'t find any available resource by resourceType.');
    }
  }
}