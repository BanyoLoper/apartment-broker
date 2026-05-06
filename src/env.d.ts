/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
  SITE_URL: string;
  WHATSAPP_NUMBER: string;
  LEAD_NOTIFY_EMAIL: string;
  PUBLIC_MAP_TILE_URL: string;
  PUBLIC_FUZZY_RADIUS_M: string;
  RESEND_API_KEY?: string;
}

declare namespace App {
  interface Locals extends Runtime {
    session?: {
      brokerId: number;
      email: string;
      name: string;
    };
  }
}
