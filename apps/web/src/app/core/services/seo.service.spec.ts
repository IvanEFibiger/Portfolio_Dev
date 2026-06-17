import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let title: jasmine.SpyObj<Title>;
  let meta: jasmine.SpyObj<Meta>;

  beforeEach(() => {
    title = jasmine.createSpyObj<Title>('Title', ['setTitle']);
    meta = jasmine.createSpyObj<Meta>('Meta', ['updateTag', 'removeTag']);

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: title },
        { provide: Meta, useValue: meta },
        { provide: DOCUMENT, useValue: document },
      ],
    });

    document.querySelector("link[rel='canonical']")?.remove();
    service = TestBed.inject(SeoService);
  });

  afterEach(() => {
    document.querySelector("link[rel='canonical']")?.remove();
  });

  it('actualiza title, description, Open Graph y Twitter con valores personalizados', () => {
    service.updateTags({
      title: 'Articulo tecnico',
      description: 'Descripcion del articulo',
      image: 'https://example.com/og.png',
      url: 'https://example.com/articulo',
      type: 'article',
      twitterCard: 'summary',
    });

    expect(title.setTitle).toHaveBeenCalledWith('Articulo tecnico');
    expect(meta.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Descripcion del articulo',
    });
    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: 'Articulo tecnico',
    });
    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: 'Descripcion del articulo',
    });
    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: 'https://example.com/og.png',
    });
    expect(meta.updateTag).toHaveBeenCalledWith({ property: 'og:type', content: 'article' });
    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:url',
      content: 'https://example.com/articulo',
    });
    expect(meta.updateTag).toHaveBeenCalledWith({ name: 'twitter:card', content: 'summary' });
    expect(meta.updateTag).toHaveBeenCalledWith({
      name: 'twitter:title',
      content: 'Articulo tecnico',
    });
    expect(meta.updateTag).toHaveBeenCalledWith({
      name: 'twitter:description',
      content: 'Descripcion del articulo',
    });
    expect(meta.updateTag).toHaveBeenCalledWith({
      name: 'twitter:image',
      content: 'https://example.com/og.png',
    });
    expect(document.querySelector<HTMLLinkElement>("link[rel='canonical']")?.href).toBe(
      'https://example.com/articulo',
    );
  });

  it('restaura el titulo y limpia tags sociales al resetear', () => {
    service.reset();

    expect(title.setTitle).toHaveBeenCalledWith('Ivan Fibiger - Systems & Software');
    expect(meta.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content:
        'Portfolio tecnico de Ivan Fibiger: sistemas reales, arquitectura, seguridad aplicada, full stack y bitacora del programador.',
    });
    expect(meta.removeTag).toHaveBeenCalledWith("property='og:title'");
    expect(meta.removeTag).toHaveBeenCalledWith("name='twitter:image'");
  });
});
