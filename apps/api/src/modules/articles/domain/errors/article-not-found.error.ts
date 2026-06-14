export class ArticleNotFoundError extends Error {
  constructor(identifier: string) {
    super(`Artículo no encontrado: ${identifier}`);
    this.name = 'ArticleNotFoundError';
  }
}
