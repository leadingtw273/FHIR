const Resource = require('./Resource');

module.exports = class Encounter extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType('Encounter');
    this.resource = resource;
  }

  get officialId() {
    try {
      return this.resource.identifier.find(({use}) => use === 'official').value;
    } catch(err) {
      this.occurError(err);
    } 
  }

  get classCode() {
    try {
      return this.resource.class.code;
    } catch(err) {
      this.occurError(err);
    } 
  }
  
  get classDisplay() {
    try {
      return this.resource.class.display;
    } catch(err) {
      this.occurError(err);
    } 
  }

  get serviceType() {
    try {
      return this.resource.serviceType.text;
    } catch(err) {
      this.occurError(err);
    } 
  }

  get periodStart(){
    try {
      return this.resource.period.start;
    } catch(err) {
      this.occurError(err);
    } 
  }

  get periodEnd(){
    try {
      return this.resource.period.end;
    } catch(err) {
      this.occurError(err);
    } 
  }

  get patientId() {
    try {
      return this.resource.subject.reference.split('/')[1];
    } catch(err) {
      this.occurError(err);
    }
  }

  get practitionerId() {
    try {
      return this.resource.participant[0].individual.reference.split('/')[1];
    } catch(err) {
      this.occurError(err);
    }
  }

  get organizationId() {
    try {
      return this.resource.serviceProvider.reference.split('/')[1];
    } catch(err) {
      this.occurError(err);
    }
  }
}