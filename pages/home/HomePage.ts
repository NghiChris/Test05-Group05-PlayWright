import { Page } from '@playwright/test';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { HeroSection } from './HeroSection';
import { FeatureSection } from './FeatureSection';

export class HomePage {
  header: Header;
  footer: Footer;
  hero: HeroSection;
  feature: FeatureSection;

  constructor(private page: Page) {
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.hero = new HeroSection(page);
    this.feature = new FeatureSection(page);
  }

  async goto() {
    await this.page.goto('/');
  }
}
