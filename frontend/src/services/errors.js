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

export class ApiError extends Error {
  constructor(status, detail) {
    super(detail || `Error ${status} en la API`);
    this.name = "ApiError";
    this.status = status;
  }
}

export class ResetLinkError extends Error {
  constructor(message = "El enlace no es válido o ha caducado") {
    super(message);
    this.name = "ResetLinkError";
  }
}