const Resource = require('./Resource');

module.exports = class Patient extends Resource {
  constructor(resource) {
    super(resource);
    this.checkResourceType('Patient');
    this.resource = resource;
  }

  get gender() {
    return this.resource.gender;
  }
  set gender(val) {
    this.resource['gender'] = val;
  }

  get birthDate() {
    return this.resource.birthDate;
  }
  set birthDate(val) {
    this.resource['birthDate'] = this.formatDate(val);
  }

  get HospitalID() {
    return this.getIdentifierValueBySystem('HospitalID');
  }
  set HospitalID(val) {
    this.setIdentifier(val, 'HospitalID');
  }

  get UID() {
    return this.getIdentifierValueBySystem('UID');
  }
  set UID(val) {
    this.setIdentifier(val);
  }

  get organizationId() {
    try{
      return this.getReferenceId(this.resource.managingOrganization);
    } catch(err) {
      this.occurError(err);
    }
  }
  set organizationId(val) {
    this.resource['managingOrganization'] = this.formatReference('Organization', val);
  }

}