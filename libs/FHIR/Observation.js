const Resource = require('./Resource');

module.exports = class Observation extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType('Observation');
    this.resource = resource;
  }

  get categoryCode() {
    try {
      return this.resource.category[0].coding[0].code;
    } catch(err) {
      this.occurError(err);
    }
  }
  
  get codeDisplay() {
    try {
      return this.resource.code.coding[0].display;
    } catch(err) {
      this.occurError(err);
    }
  }
  
  get effectiveDateTime() {
    return this.resource.effectiveDateTime;
  }
  
  get bodySiteText() {
    try {
      return this.resource.bodySite.text;
    } catch(err) {
      this.occurError(err);
    }
  }
  
  get valueQuantity() {
    try {
      return this.resource.valueQuantity.value;
    } catch(err) {
      this.occurError(err);
    }
  }
  
  get valueUnit() {
    try {
      return this.resource.valueQuantity.code;
    } catch(err) {
      this.occurError(err);
    }
  }
  
  get interpretationCode() {
    try {
      return this.resource.interpretation[0].coding[0].code;
    } catch(err) {
      this.occurError(err);
    }
  }
  
  get interpretationDisplay() {
    try {
      return this.resource.interpretation[0].coding[0].display;
    } catch(err) {
      this.occurError(err);
    }
  }
  
  get referenceRangeDisplay() {
    try {
      const {high, low} = this.resource.referenceRange[0];
      const lowString = low.value == null ? '' : low.value + (low.unit || '');
      const highString = high.value == null ? '' : high.value + (high.unit || '');
      return `${lowString} - ${highString}`
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
  
  get encounterId() {
    try {
      return this.resource.encounter.reference.split('/')[1];
    } catch(err) {
      this.occurError(err);
    }
  }
  
  get serviceRequestId() {
    try {
      return this.resource.basedOn[0].reference.split('/')[1];
    } catch(err) {
      this.occurError(err);
    }
  }
}