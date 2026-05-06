declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    ttq?: {
      track: (...args: any[]) => void;
      page: () => void;
    };
  }
}

export {};