const dayjs = require("dayjs");

module.exports = class Resource {
  constructor(resource) {
    this.resource = resource;
  }

  get resourceType() {
    return this.resource.resourceType;
  }

  get id() {
    return this.resource.id;
  }

  get identifier() {
    return this.resource.identifier;
  }

  addIdentifier({ value, system = "UID", use = "official" }) {
    const result = { use, system, value };
    if (Array.isArray(this.resource["identifier"])) {
      this.resource["identifier"].push(result);
    } else {
      this.resource["identifier"] = [result];
    }
  }

  formatDateTime(dateTime) {
    return dayjs(dateTime).format();
  }

  formatDate(date) {
    return dayjs(date).format("YYYY-MM-DD");
  }

  formatReference(resourceType, id) {
    return {
      reference: resourceType + "/" + id
    };
  }

  formatCoding({ system, version, code, display, userSelected }) {
    return { system, version, code, display, userSelected };
  }

  formatCodeableConcept(coding, text = "") {
    return {
      coding: [this.formatCoding(coding)],
      text
    };
  }

  getReferenceId({ reference }) {
    try {
      return reference.split("/")[1];
    } catch (err) {
      this.occurError(err);
    }
  }

  occurError(err) {
    if (err.name === "TypeError") return undefined;
    throw err;
  }

  checkResourceType(type) {
    if (this.resourceType !== type)
      throw Error(`resource type must be ${type}`);
  }
};
