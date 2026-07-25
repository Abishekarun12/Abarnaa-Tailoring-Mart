declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SHEETS_WEBAPP_URL?: string;
    readonly NEXT_PUBLIC_SANITY_PROJECT_ID?: string;
    readonly NEXT_PUBLIC_SANITY_DATASET?: string;
    readonly NEXT_PUBLIC_SANITY_API_VERSION?: string;
    readonly SANITY_STUDIO_PROJECT_ID?: string;
    readonly SANITY_STUDIO_DATASET?: string;
    readonly STUDIO_ACCESS_PATH?: string;
  }
}
