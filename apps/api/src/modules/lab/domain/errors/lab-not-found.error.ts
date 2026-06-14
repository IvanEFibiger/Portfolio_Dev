export class LabNotFoundError extends Error {
  constructor(id: string) {
    super(`Lab item not found: ${id}`);
    this.name = 'LabNotFoundError';
  }
}
