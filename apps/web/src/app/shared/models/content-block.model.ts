export type ArticleContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'quote'; text: string }
  | {
      type: 'callout';
      variant: 'info' | 'warning' | 'danger' | 'success';
      title?: string;
      text: string;
    }
  | { type: 'image'; url: string; alt: string }
  | { type: 'list'; ordered: boolean; items: string[] };
