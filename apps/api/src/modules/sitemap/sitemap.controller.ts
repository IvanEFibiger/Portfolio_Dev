import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { SitemapService } from './sitemap.service';

@ApiTags('SEO')
@Controller()
@SkipThrottle()
export class SitemapController {
  constructor(private readonly sitemapService: SitemapService) {}

  @Get('sitemap.xml')
  @Header('Content-Type', 'application/xml')
  @ApiOperation({ summary: 'Sitemap XML para motores de búsqueda' })
  async sitemap(): Promise<string> {
    return this.sitemapService.generateSitemap();
  }

  @Get('robots.txt')
  @Header('Content-Type', 'text/plain')
  @ApiOperation({ summary: 'Robots.txt' })
  robots(): string {
    return this.sitemapService.generateRobots();
  }
}
