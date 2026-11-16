export class NotFoundError extends Error {
  constructor(resource, id) {
    super(`No existe ningún registro de "${resource}" con id ${id}`);
    this.name = "NotFoundError";
    this.resource = resource;
    this.id = id;
  }
}