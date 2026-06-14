import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleOrmEntity } from '../articles/infrastructure/persistence/article.orm-entity';
import { ProjectOrmEntity } from '../projects/infrastructure/persistence/project.orm-entity';
import { LabOrmEntity } from '../lab/infrastructure/persistence/lab.orm-entity';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

@Injectable()
export class SitemapService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(ArticleOrmEntity)
    private readonly articleRepo: Repository<ArticleOrmEntity>,
    @InjectRepository(ProjectOrmEntity)
    private readonly projectRepo: Repository<ProjectOrmEntity>,
    @InjectRepository(LabOrmEntity)
    private readonly labRepo: Repository<LabOrmEntity>,
  ) {}

  async generateSitemap(): Promise<string> {
    const siteUrl = this.config.get<string>('siteUrl') ?? 'https://ivanfibigerdev.com';
    const urls: SitemapUrl[] = [];

    // Static pages
    const staticPages = [
      { path: '', priority: '1.0', changefreq: 'weekly' },
      { path: '/sobre-mi', priority: '0.8', changefreq: 'monthly' },
      { path: '/proyectos', priority: '0.9', changefreq: 'weekly' },
      { path: '/bitacora', priority: '0.9', changefreq: 'weekly' },
      { path: '/laboratorio', priority: '0.8', changefreq: 'weekly' },
      { path: '/contacto', priority: '0.7', changefreq: 'monthly' },
      { path: '/como-esta-construido', priority: '0.6', changefreq: 'monthly' },
    ];

    for (const page of staticPages) {
      urls.push({
        loc: `${siteUrl}${page.path}`,
        changefreq: page.changefreq,
        priority: page.priority,
      });
    }

    // Articles
    const articles = await this.articleRepo.find({
      where: { status: 'published', visibility: 'public' },
      order: { updatedAt: 'DESC' },
    });
    for (const article of articles) {
      urls.push({
        loc: `${siteUrl}/bitacora/${article.slug}`,
        lastmod: article.updatedAt.toISOString(),
        changefreq: 'monthly',
        priority: '0.8',
      });
    }

    // Projects
    const projects = await this.projectRepo.find({
      where: { status: 'published' },
      order: { updatedAt: 'DESC' },
    });
    for (const project of projects) {
      urls.push({
        loc: `${siteUrl}/proyectos/${project.slug}`,
        lastmod: project.updatedAt.toISOString(),
        changefreq: 'monthly',
        priority: '0.8',
      });
    }

    // Lab list page (no detail pages yet)
    const labs = await this.labRepo.find({
      where: [{ status: 'Explorando' }, { status: 'En desarrollo' }, { status: 'Documentado' }],
      order: { updatedAt: 'DESC' },
      take: 1,
    });
    if (labs.length) {
      urls.push({
        loc: `${siteUrl}/laboratorio`,
        lastmod: labs[0].updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: '0.7',
      });
    }

    const urlEntries = urls
      .map(
        (u) =>
          `  <url>\n    <loc>${this.escapeXml(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}${u.changefreq ? `\n    <changefreq>${u.changefreq}</changefreq>` : ''}${u.priority ? `\n    <priority>${u.priority}</priority>` : ''}\n  </url>`,
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;
  }

  generateRobots(): string {
    const siteUrl = this.config.get<string>('siteUrl') ?? 'https://ivanfibigerdev.com';
    return `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  }

  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
