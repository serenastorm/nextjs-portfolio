export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          likes: number | null
        }
        Insert: {
          id?: number
          likes?: number | null
        }
        Update: {
          id?: number
          likes?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_likes: {
        Args: { row_id: number; increment_amount: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

