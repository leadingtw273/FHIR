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

  get birthDate() {
    return this.resource.birthDate;
  }

  get HospitalID() {
    try {
      return this.resource.identifier.find(({system}) => system === 'HospitalID').value;
    } catch(err) {
      this.occurError(err);
    }
  }

  get UID() {
    try {
      return this.resource.identifier.find(({system}) => system === 'UID').value;
    } catch(err) {
      this.occurError(err);
    }
  }

  get organizationId() {
    try{
      return this.resource.managingOrganization.reference.split('/')[1];
    } catch(err) {
      this.occurError(err);
    }
  }

}