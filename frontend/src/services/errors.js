export class NotFoundError extends Error {
  constructor(resource, id) {
    super(`No existe ningún registro de "${resource}" con id ${id}`);
    this.name = "NotFoundError";
    this.resource = resource;
    this.id = id;
  }
}

export class AuthError extends Error {
  constructor(message = "Correo o contraseña incorrectos") {
    super(message);
    this.name = "AuthError";
  }
}