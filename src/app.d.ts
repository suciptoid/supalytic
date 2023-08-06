// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Database } from '$lib/server/schema';
import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
    interface Locals {
      supabase: SupabaseClient;
      db: SupabaseClient<Database>;
      getSession(): Promise<Session | null>;
    }
    interface PageData {
      session: Session | null;
    }
  }
}

export {};
