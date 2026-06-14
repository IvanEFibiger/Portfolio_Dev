import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { BROWSER_STORAGE } from '../tokens/storage.token';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject(BROWSER_STORAGE);
  private readonly key = 'portfolio_theme';
  private readonly themeState = signal<ThemeMode>(this.readTheme());

  readonly theme = this.themeState.asReadonly();

  constructor() {
    this.apply(this.themeState());
  }

  toggle(): void {
    this.setTheme(this.themeState() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: ThemeMode): void {
    this.themeState.set(theme);
    this.storage.setItem(this.key, theme);
    this.apply(theme);
  }

  private readTheme(): ThemeMode {
    const stored = this.storage.getItem(this.key);
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  }

  private apply(theme: ThemeMode): void {
    this.document.documentElement.setAttribute('data-theme', theme);
    this.document.documentElement.style?.setProperty('color-scheme', theme);
  }
}
