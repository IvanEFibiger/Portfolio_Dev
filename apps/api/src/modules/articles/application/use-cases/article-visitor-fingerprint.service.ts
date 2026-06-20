import { createHash } from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface VisitorFingerprintContext {
  ip?: string;
  userAgent?: string;
}

@Injectable()
export class ArticleVisitorFingerprintService {
  constructor(private readonly config: ConfigService) {}

  buildVisitorHash(context: VisitorFingerprintContext): string | null {
    if (!context.ip) return null;
    const secret = this.config.get<string>('jwt.secret') ?? '';
    return createHash('sha256')
      .update(`${context.ip}|${context.userAgent ?? ''}|article-reactions|${secret}`)
      .digest('hex');
  }
}
