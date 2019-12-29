const Resource = require("./Resource");

module.exports = class Encounter extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType("Encounter");
    this.resource = resource;
  }

  get officialId() {
    return this.getIdentifierValueByUse("official");
  }
  set officialId(val) {
    this.setIdentifier(val);
  }

  get classCode() {
    try {
      return this.resource.class.code;
    } catch (err) {
      this.occurError(err);
    }
  }
  set classCode(val) {
    this.resource["class"] = {
      ...this.resource["class"],
      system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
      code: val
    };
  }

  get classDisplay() {
    try {
      return this.resource.class.display;
    } catch (err) {
      this.occurError(err);
    }
  }
  set classDisplay(val) {
    this.resource["class"] = {
      ...this.resource["class"],
      system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
      display: val
    };
  }

  get serviceTypeText() {
    try {
      return this.resource.serviceType.text;
    } catch (err) {
      this.occurError(err);
    }
  }
  set serviceTypeText(val) {
    this.resource["serviceType"] = {
      text: val
    };
  }

  get period() {
    try {
      return this.resource["period"];
    } catch (err) {
      this.occurError(err);
    }
  }
  set period({ start, end }) {
    this.resource["period"] = {
      start: this.formatDate(start),
      end: this.formatDate(end)
    };
  }

  get patientId() {
    try {
      return this.getReferenceId(this.resource.subject);
    } catch (err) {
      this.occurError(err);
    }
  }
  set patientId(val) {
    this.resource["subject"] = this.formatReference("Patient", val);
  }

  get practitionerId() {
    try {
      return this.getReferenceId(this.resource.participant[0].individual);
    } catch (err) {
      this.occurError(err);
    }
  }
  set practitionerId(val) {
    const result = this.formatReference("Practitioner", val);
    if (Array.isArray(this.resource["participant"])) {
      this.resource["participant"].push(result);
    } else {
      this.resource["participant"] = [result];
    }
  }

  get organizationId() {
    try {
      return this.getReferenceId(this.resource.serviceProvider);
    } catch (err) {
      this.occurError(err);
    }
  }
  set organizationId(val) {
    this.resource["serviceProvider"] = this.formatReference(
      "Organization",
      val
    );
  }
};
