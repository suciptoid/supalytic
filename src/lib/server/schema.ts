export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
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
      [_ in never]: never
    }
    Functions: {
      get_metrics: {
        Args: {
          website_id: string
          start_time: string
          end_time: string
          time_group?: string
          filters?: Json
        }
        Returns: {
          metrics: string
          name: string
          unique_visitor: number
          page_view: number
          time_interval: string
        }[]
      }
      get_session: {
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
