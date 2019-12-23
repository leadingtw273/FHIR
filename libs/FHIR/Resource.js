const dayjs = require('dayjs');

module.exports = class Resource {
  constructor(resource) {
    this.resource = resource;
  }

  get resourceType() {
    return this.resource.resourceType;
  }
  set resourceType(val) {
    if(val == null || val === '')
      throw new Error('resourceType can\'t be null, undefind or empty String value.');
    if(typeof val !== String)
      throw new Error('resourceType must be String type.');

    this.resource.resourceType = val;
  }

  get id() {
    return this.resource.id;
  }
  set id(val) {
    throw new Error('can\'t set resource id');
  }

  get meta() {
    return this.resource.meta;
  }
  set meta(val) {
    throw new Error('can\'t set resource meta');
  }

  formatDateTime(val) {
    return dayjs(val).format();
  }

  formatDate(val) {
    return dayjs(val).format('YYYY-MM-DD');
  }

  formatReference(resourceType, val) {
    return {
      reference: resourceType + '/' + val
    }
  }

  getReferenceId(val) {
    try {
      return val.reference.split('/')[1];    
    } catch(err) {
      this.occurError(err);
    } 
  }

  getIdentifierValueBySystem(_system) {
    try {
      return this.resource.identifier.find(({system}) => system === _system).value;
    } catch(err) {
      this.occurError(err);
    } 
  }

  getIdentifierValueByUse(_use) {
    try {
      return this.resource.identifier.find(({use}) => use === _use).value;
    } catch(err) {
      this.occurError(err);
    } 
  }

  setIdentifier(value, system = 'UID', use = 'official') {
    const result = { use, system, value };
    if(Array.isArray(this.resource['identifier'])) {
      this.resource['identifier'].push(result);
    } else {
      this.resource['identifier'] = [ result ];
    }
  }

  occurError(err) {
    if(err.name === 'TypeError') return undefined;
    throw err;
  }

  checkResourceType(type) {
    if(this.resourceType !== type)
      throw Error(`resource type must be ${type}`);
  }
}