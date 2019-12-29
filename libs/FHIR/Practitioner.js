const Resource = require("./Resource");

module.exports = class Practitioner extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType("Practitioner");
    this.resource = resource;
  }

  get identifier() {
    try {
      return super.identifier[0].value;
    } catch (err) {
      this.occurError(err);
    }
  }
  set identifier(val) {
    super.identifier[0].value = val;
  }
};
