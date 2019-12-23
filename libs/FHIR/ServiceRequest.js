const Resource = require('./Resource');

module.exports = class ServiceRequest extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType('ServiceRequest');
    this.resource = resource;
  }

  get officialId() {
    return this.getIdentifierValueByUse('official');
  }
  set officialId(val) {
    this.setIdentifier(val);
  }

  get codeText() {
    try {
      return this.resource.code.text;
    } catch(err) {
      this.occurError(err);
    } 
  }
  set codeText(val) {
    this.resource['code'] = {
      text: val
    };
  }

  get occurrenceDateTime() {
    return this.resource.occurrenceDateTime;
  }
  set occurrenceDateTime(val) {
    this.resource['occurrenceDateTime'] = this.formatDateTime(val);
  }

  get authoredOn() {
    return this.resource.authoredOn;
  }
  set authoredOn(val) {
    this.resource['authoredOn'] = this.formatDateTime(val);
  }

  get patientId() {
    try {
      return this.getReferenceId(this.resource.subject);
    } catch(err) {
      this.occurError(err);
    } 
  }
  set patientId(val) {
    this.resource['subject'] = this.formatReference('Patient', val);
  }

  get practitionerId() {
    try {
      return this.getReferenceId(this.resource.requester);
    } catch(err) {
      this.occurError(err);
    } 
  }
  set practitionerId(val) {
    this.resource['requester'] = this.formatReference('Practitioner', val);
  }

  get encounterId() {
    try {
      return this.getReferenceId(this.resource.encounter);
    } catch(err) {
      this.occurError(err);
    } 
  }
  set encounterId(val) {
    this.resource['encounter'] = this.formatReference('Encounter', val);
  }
  
  get organizationId() {
    try {
      return this.getReferenceId(this.resource.performer[0]);
    } catch(err) {
      this.occurError(err);
    } 
  }
  set organizationId(val) {
    const result = this.formatReference('Organization', val);
    if(Array.isArray(this.resource['performer'])){
      this.resource['performer'].push(result);
    } else {
      this.resource['performer'] = [ result ];
    }
  }
}