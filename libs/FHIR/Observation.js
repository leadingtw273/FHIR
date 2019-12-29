const Resource = require("./Resource");

module.exports = class Observation extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType("Observation");
    this.resource = resource;
  }

  get categoryCode() {
    try {
      return this.resource.category[0].coding[0].code;
    } catch (err) {
      this.occurError(err);
    }
  }
  set categoryCode(code) {
    const codeableConcept = this.formatCodeableConcept({
      system: "http://hl7.org/fhir/ValueSet/observation-category",
      code
    });
    this.resource["category"] = [codeableConcept];
  }

  get codeDisplay() {
    try {
      return this.resource.code.coding[0].display;
    } catch (err) {
      this.occurError(err);
    }
  }
  set codeDisplay(display) {
    const codeableConcept = this.formatCodeableConcept({
      system: "http://loinc.org",
      display
    });
    this.resource["coding"] = codeableConcept;
  }

  get effectiveDateTime() {
    return this.resource.effectiveDateTime;
  }
  set effectiveDateTime(dateTime) {
    this.resource["effectiveDateTime"] = dateTime;
  }

  get bodySiteText() {
    try {
      return this.resource.bodySite.text;
    } catch (err) {
      this.occurError(err);
    }
  }
  set bodySiteText(text) {
    this.resource["bodySite"] = this.formatCodeableConcept({}, text);
  }

  get valueQuantity() {
    try {
      return this.resource.valueQuantity;
    } catch (err) {
      this.occurError(err);
    }
  }
  set valueQuantity({ value, comparator, unit, system, code }) {
    this.resource["valueQuantity"] = { value, comparator, unit, system, code };
  }

  get interpretationCoding() {
    try {
      return this.resource.interpretation[0].coding[0];
    } catch (err) {
      this.occurError(err);
    }
  }
  set interpretationCoding({ code, display }) {
    const codeableConcept = this.formatCodeableConcept({
      system: "http://hl7.org/fhir/v2/0078",
      code,
      display
    });
    this.resource["interpretation"] = [codeableConcept];
  }

  get referenceRange() {
    try {
      return this.resource.referenceRange[0];
    } catch (err) {
      this.occurError(err);
    }
  }
  set referenceRange({ low, high }) {
    this.resource["referenceRange"] = [{ high, low }];
  }

  get patientId() {
    return this.getReferenceId(this.resource.subject);
  }
  set patientId(id) {
    this.resource["subject"] = this.formatReference("Patient", id);
  }

  get encounterId() {
    return this.getReferenceId(this.resource.encounter);
  }
  set encounterId(id) {
    this.resource["encounter"] = this.formatReference("Encounter", id);
  }

  get serviceRequestId() {
    return this.getReferenceId(this.resource.basedOn[0]);
  }
  set serviceRequestId(id) {
    this.resource["basedOn"] = [this.formatReference("ServiceRequest", id)];
  }
};
