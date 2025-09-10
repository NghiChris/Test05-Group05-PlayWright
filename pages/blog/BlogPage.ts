import { Page } from '@playwright/test';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { PostListSection } from './PostListSection';
import { SidebarSection } from './SidebarSection';

export class BlogPage {
  header: Header;
  footer: Footer;
  postList: PostListSection;
  sidebar: SidebarSection;

  constructor(private page: Page) {
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.postList = new PostListSection(page);
    this.sidebar = new SidebarSection(page);
  }

  async goto() {
    await this.page.goto('/blog');
  }
}