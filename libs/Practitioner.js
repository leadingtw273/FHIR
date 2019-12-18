const Resource = require('./Resource');

module.exports = class Practitioner extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType('Practitioner');
    this.resource = resource;
  }

  get officialId() {
    try {
      return this.resource.identifier.find(({use}) => use === 'official').value;
    } catch(err) {
      this.occurError(err);
    } 
  }
}