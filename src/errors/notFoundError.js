class NotFoundError extends Error {
  constructor(entityName, id) {
    super(`${entityName} with id ${id} was not found!`);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export default NotFoundError;
