const Resource = require('./Resource');

module.exports = class ServiceRequest extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType('ServiceRequest');
    this.resource = resource;
  }

  
  get officialId() {
    try {
      return this.resource.identifier.find(({use}) => use === 'official').value;
    } catch(err) {
      this.occurError(err);
    } 
  }

  get codeText() {
    try {
      return this.resource.code.text;
    } catch(err) {
      this.occurError(err);
    } 
  }

  get occurrenceDateTime() {
    return this.resource.occurrenceDateTime;
  }

  get authoredOn() {
    return this.resource.authoredOn;
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
      return this.resource.requester.reference.split('/')[1];
    } catch(err) {
      this.occurError(err);
    } 
  }

  get encounterId() {
    try {
      return this.resource.encounter.reference.split('/')[1];
    } catch(err) {
      this.occurError(err);
    } 
  }
  
  get organizationId() {
    try {
      return this.resource.performer[0].reference.split('/')[1];
    } catch(err) {
      this.occurError(err);
    } 
  }
}