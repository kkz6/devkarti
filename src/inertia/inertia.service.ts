import { Injectable } from '@nestjs/common';
import { Request } from 'express';

interface SharedData {
  [key: string]: any;
}

@Injectable()
export class InertiaService {
  private sharedData: SharedData = {};

  /**
   * Share data globally across all Inertia responses
   */
  share(key: string, value: any): void;
  share(data: SharedData): void;
  share(keyOrData: string | SharedData, value?: any): void {
    if (typeof keyOrData === 'string') {
      this.sharedData[keyOrData] = value;
    } else {
      this.sharedData = { ...this.sharedData, ...keyOrData };
    }
  }

  /**
   * Get all shared data
   */
  getSharedData(): SharedData {
    return this.sharedData;
  }

  /**
   * Clear shared data
   */
  clearSharedData(): void {
    this.sharedData = {};
  }

  /**
   * Get shared data for a specific request (can be extended to include request-specific data)
   */
  getSharedDataForRequest(request: Request): SharedData {
    // This can be extended to include request-specific shared data
    // For example, user data, locale, etc.
    return {
      ...this.sharedData,
      // Add request-specific data here if needed
    };
  }
} 