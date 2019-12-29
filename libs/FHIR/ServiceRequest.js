const Resource = require("./Resource");

module.exports = class ServiceRequest extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType("ServiceRequest");
    this.resource = resource;
  }

  get officialId() {
    return this.getIdentifierValueByUse("official");
  }
  set officialId(val) {
    this.setIdentifier(val);
  }

  get codeText() {
    try {
      return this.resource.code.text;
    } catch (err) {
      this.occurError(err);
    }
  }
  set codeText(text) {
    this.resource["code"] = this.formatCodeableConcept({}, text);
  }

  get occurrenceDateTime() {
    return this.resource.occurrenceDateTime;
  }
  set occurrenceDateTime(dateTime) {
    this.resource["occurrenceDateTime"] = this.formatDateTime(dateTime);
  }

  get authoredOn() {
    return this.resource.authoredOn;
  }
  set authoredOn(dateTime) {
    this.resource["authoredOn"] = this.formatDateTime(dateTime);
  }

  get patientId() {
    return this.getReferenceId(this.resource.subject);
  }
  set patientId(id) {
    this.resource["subject"] = this.formatReference("Patient", id);
  }

  get practitionerId() {
    return this.getReferenceId(this.resource.requester);
  }
  set practitionerId(id) {
    this.resource["requester"] = this.formatReference("Practitioner", id);
  }

  get encounterId() {
    return this.getReferenceId(this.resource.encounter);
  }
  set encounterId(id) {
    this.resource["encounter"] = this.formatReference("Encounter", id);
  }

  get organizationId() {
    return this.getReferenceId(this.resource.performer[0]);
  }
  set organizationId(id) {
    this.resource["performer"] = [this.formatReference("Organization", id)];
  }
};
