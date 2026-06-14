export class ContactMessageNotFoundError extends Error {
  constructor(identifier: string) {
    super(`Mensaje de contacto no encontrado: ${identifier}`);
    this.name = 'ContactMessageNotFoundError';
  }
}
