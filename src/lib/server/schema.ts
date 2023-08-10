export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sessions: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string | null
          device: string | null
          id: string
          lang: string | null
          os: string | null
          screen: number | null
          ua: string | null
          website_id: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string | null
          device?: string | null
          id?: string
          lang?: string | null
          os?: string | null
          screen?: number | null
          ua?: string | null
          website_id?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string | null
          device?: string | null
          id?: string
          lang?: string | null
          os?: string | null
          screen?: number | null
          ua?: string | null
          website_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_website_id_fkey"
            columns: ["website_id"]
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_website_id_fkey"
            columns: ["website_id"]
            referencedRelation: "website_metrics"
            referencedColumns: ["website_id"]
          },
          {
            foreignKeyName: "sessions_website_id_fkey"
            columns: ["website_id"]
            referencedRelation: "website_stats_hourly"
            referencedColumns: ["website_id"]
          }
        ]
      }
      website_events: {
        Row: {
          created_at: string
          data: Json | null
          event_name: string | null
          id: string
          session_id: string | null
          website_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          event_name?: string | null
          id?: string
          session_id?: string | null
          website_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          event_name?: string | null
          id?: string
          session_id?: string | null
          website_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "website_events_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_events_website_id_fkey"
            columns: ["website_id"]
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_events_website_id_fkey"
            columns: ["website_id"]
            referencedRelation: "website_metrics"
            referencedColumns: ["website_id"]
          },
          {
            foreignKeyName: "website_events_website_id_fkey"
            columns: ["website_id"]
            referencedRelation: "website_stats_hourly"
            referencedColumns: ["website_id"]
          }
        ]
      }
      website_users: {
        Row: {
          created_at: string | null
          role: number
          user_id: string
          website_id: string
        }
        Insert: {
          created_at?: string | null
          role?: number
          user_id: string
          website_id: string
        }
        Update: {
          created_at?: string | null
          role?: number
          user_id?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_users_website_id_fkey"
            columns: ["website_id"]
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_users_website_id_fkey"
            columns: ["website_id"]
            referencedRelation: "website_metrics"
            referencedColumns: ["website_id"]
          },
          {
            foreignKeyName: "website_users_website_id_fkey"
            columns: ["website_id"]
            referencedRelation: "website_stats_hourly"
            referencedColumns: ["website_id"]
          }
        ]
      }
      websites: {
        Row: {
          created_at: string | null
          domain: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string | null
          domain?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      website_metrics: {
        Row: {
          browser: string | null
          device: string | null
          event_count: number | null
          event_name: string | null
          hour: string | null
          os: string | null
          path: string | null
          referer: string | null
          screen: number | null
          website_domain: string | null
          website_id: string | null
        }
        Relationships: []
      }
      website_stats_hourly: {
        Row: {
          hour: string | null
          page_views: number | null
          unique_visitors: number | null
          website_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_metrics: {
        Args: {
          website_id: string
          metric_name: string
          range: string
        }
        Returns: {
          name: string
          value: string
          count: number
          timeframe: string
        }[]
      }
      get_session:
        | {
            Args: {
              p_ip: string
              p_website_id: string
              p_ua: string
              p_browser?: string
              p_device?: string
              p_os?: string
              p_screen?: number
              p_lang?: string
            }
            Returns: {
              browser: string | null
              country: string | null
              created_at: string | null
              device: string | null
              id: string
              lang: string | null
              os: string | null
              screen: number | null
              ua: string | null
              website_id: string | null
            }
          }
        | {
            Args: {
              p_ip: string
              p_website_id: string
              p_ua: string
              p_browser?: string
              p_device?: string
              p_os?: string
              p_screen?: number
              p_lang?: string
              p_country?: string
            }
            Returns: {
              browser: string | null
              country: string | null
              created_at: string | null
              device: string | null
              id: string
              lang: string | null
              os: string | null
              screen: number | null
              ua: string | null
              website_id: string | null
            }
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
