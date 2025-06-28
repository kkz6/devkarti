// This file can be used for any custom type declarations needed by the application

declare namespace Express {
  interface Response {
    inertia: {
      render(component: string, props?: any): Promise<void>;
      share(data: any): void;
      redirect(url: string): void;
    };
  }
} 