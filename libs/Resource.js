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

  occurError(err) {
    if(err.name === 'TypeError') return undefined;
    throw err;
  }

  checkResourceType(type) {
    if(this.resourceType !== type)
      throw Error(`resource type must be ${type}`);
  }
}