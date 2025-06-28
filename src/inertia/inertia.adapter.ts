import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InertiaAdapter {
  private htmlTemplate: string;

  constructor() {
    // Load the HTML template
    const templatePath = path.join(process.cwd(), 'views', 'app.html');
    this.htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
  }

  render(request: Request, response: Response, page: any) {
    const isInertiaRequest = request.headers['x-inertia'];

    if (isInertiaRequest) {
      response.setHeader('X-Inertia', 'true');
      response.setHeader('Content-Type', 'application/json');
      response.json(page);
    } else {
      // Server-side rendering
      const html = this.htmlTemplate
        .replace('{{ head }}', this.generateHead(page))
        .replace('{{ app }}', this.generateApp(page));
      
      response.setHeader('Content-Type', 'text/html');
      response.send(html);
    }
  }

  private generateHead(page: any): string {
    // Generate meta tags and title
    const title = page.props.title || 'DevKarti';
    return `<title>${title}</title>`;
  }

  private generateApp(page: any): string {
    // Generate the initial page data
    return `<div id="app" data-page='${JSON.stringify(page)}'></div>`;
  }
} 