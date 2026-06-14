export class ProjectNotFoundError extends Error {
  constructor(identifier: string) {
    super(`Proyecto no encontrado: ${identifier}`);
    this.name = 'ProjectNotFoundError';
  }
}
