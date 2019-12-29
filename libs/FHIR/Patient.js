const Resource = require("./Resource");
const _ = require("lodash");

module.exports = class Patient extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType("Patient");
    this.resource = resource;
  }

  get gender() {
    return this.resource.gender;
  }
  set gender(val) {
    this.resource["gender"] = val;
  }

  get birthDate() {
    return this.resource.birthDate;
  }
  set birthDate(val) {
    this.resource["birthDate"] = this.formatDate(val);
  }

  get HospitalID() {
    try {
      return this.getIdentifierBySystem("HospitalID").value;
    } catch (err) {
      this.occurError(err);
    }
  }
  set HospitalID(identifierValue) {
    const identifier = this.getIdentifierBySystem("HospitalID");

    if (identifier == null) {
      this.addIdentifier({
        use: "official",
        system: "HospitalID",
        value: identifierValue
      });
    } else {
      identifier["value"] = identifierValue;
    }
  }

  get UID() {
    try {
      return this.getIdentifierBySystem("UID").value;
    } catch (err) {
      this.occurError(err);
    }
  }
  set UID(identifierValue) {
    const identifier = this.getIdentifierBySystem("UID");
    if (identifier == null) {
      this.addIdentifier({
        use: "official",
        system: "UID",
        value: identifierValue
      });
    } else {
      identifier["value"] = identifierValue;
    }
  }

  get organizationId() {
    return this.getReferenceId(this.resource.managingOrganization);
  }
  set organizationId(id) {
    this.resource["managingOrganization"] = this.formatReference(
      "Organization",
      id
    );
  }

  getIdentifierBySystem(_system) {
    return this.resource.identifier.find(({ system }) => system === _system);
  }
};
