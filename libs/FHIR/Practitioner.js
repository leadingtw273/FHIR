const Resource = require('./Resource');

module.exports = class Practitioner extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType('Practitioner');
    this.resource = resource;
  }

  get officialId() {
    return this.getIdentifierValueByUse('official');
  }
  set officialId(val) {
    this.setIdentifier(val);
  }
}