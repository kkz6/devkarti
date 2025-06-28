import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';

export interface InertiaPage {
  component: string;
  props: Record<string, any>;
  url: string;
  version: string | null;
}

@Injectable()
export class InertiaService {
  private sharedData: Record<string, any> = {};
  private version: string | null = null;
  private rootView = 'app';

  setVersion(version: string | null): void {
    this.version = version;
  }

  getVersion(): string | null {
    return this.version || this.generateVersion();
  }

  setRootView(view: string): void {
    this.rootView = view;
  }

  getRootView(): string {
    return this.rootView;
  }

  share(key: string, value: any): void;
  share(data: Record<string, any>): void;
  share(keyOrData: string | Record<string, any>, value?: any): void {
    if (typeof keyOrData === 'string') {
      this.sharedData[keyOrData] = value;
    } else {
      this.sharedData = { ...this.sharedData, ...keyOrData };
    }
  }

  getShared(): Record<string, any> {
    return this.sharedData;
  }

  flushShared(): void {
    this.sharedData = {};
  }

  private generateVersion(): string {
    // In production, this could be based on asset manifest or git commit hash
    return crypto.randomBytes(8).toString('hex');
  }

  isInertiaRequest(request: Request): boolean {
    return request.header('X-Inertia') === 'true';
  }

  getUrl(request: Request): string {
    const protocol = request.secure ? 'https' : 'http';
    const host = request.get('host');
    const url = request.originalUrl;
    return `${protocol}://${host}${url}`;
  }

  resolveProps(
    props: Record<string, any>,
    request: Request,
  ): Record<string, any> {
    const only = this.getOnly(request);
    const except = this.getExcept(request);
    const resolvedProps: Record<string, any> = {};

    // Add shared data
    const allProps = { ...this.sharedData, ...props };

    for (const [key, value] of Object.entries(allProps)) {
      // Handle partial reloads
      if (only.length && !only.includes(key)) {
        continue;
      }

      if (except.length && except.includes(key)) {
        continue;
      }

      // Resolve lazy props
      if (typeof value === 'function') {
        resolvedProps[key] = value();
      } else {
        resolvedProps[key] = value;
      }
    }

    return resolvedProps;
  }

  private getOnly(request: Request): string[] {
    const only = request.header('X-Inertia-Partial-Data');
    return only ? only.split(',').map(s => s.trim()) : [];
  }

  private getExcept(request: Request): string[] {
    const except = request.header('X-Inertia-Partial-Except');
    return except ? except.split(',').map(s => s.trim()) : [];
  }

  buildPage(
    component: string,
    props: Record<string, any>,
    request: Request,
  ): InertiaPage {
    return {
      component,
      props: this.resolveProps(props, request),
      url: this.getUrl(request),
      version: this.getVersion(),
    };
  }
} 