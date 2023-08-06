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
      [_ in never]: never
    }
    Enums: {
      roles: "owner" | "admin" | "member"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
