/// <reference types="vite/client" />

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

interface Window {
  firebase?: {
    apps: unknown[];
    auth: () => {
      currentUser: unknown;
      onAuthStateChanged: (callback: (user: unknown) => void) => () => void;
    };
  };
  __PI_AUTH_BOOTSTRAP__?: Promise<'ready' | 'redirected'>;
}
