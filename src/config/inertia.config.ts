export interface InertiaConfig {
  /**
   * The root view template file
   */
  rootView: string;

  /**
   * Version for asset versioning
   */
  version?: string | (() => string | Promise<string>);

  /**
   * SSR configuration
   */
  ssr?: {
    enabled: boolean;
    url?: string;
  };

  /**
   * Whether to encrypt history by default
   */
  encryptHistory?: boolean;
}

export const inertiaConfig: InertiaConfig = {
  rootView: 'app',
  
  // Asset versioning - can be a string, or a function that returns a version
  version: () => {
    // In production, you might want to read from a manifest file
    return process.env.APP_VERSION || Date.now().toString();
  },

  // Server-side rendering configuration
  ssr: {
    enabled: false,
    url: 'http://localhost:13714',
  },

  // History encryption
  encryptHistory: false,
}; 