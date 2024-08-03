export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      friends: {
        Row: {
          avatar: string | null
          created_at: string
          deleted: boolean
          frequency: Database["public"]["Enums"]["frequency"]
          id: number
          name: string
          user_id: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          deleted?: boolean
          frequency?: Database["public"]["Enums"]["frequency"]
          id?: number
          name: string
          user_id?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          deleted?: boolean
          frequency?: Database["public"]["Enums"]["frequency"]
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friends_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          deleted: boolean
          full_name: string | null
          id: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          deleted?: boolean
          full_name?: string | null
          id: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          deleted?: boolean
          full_name?: string | null
          id?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      visits: {
        Row: {
          created_at: string
          date: string
          deleted: boolean
          friend: number
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          deleted?: boolean
          friend: number
          id?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          date?: string
          deleted?: boolean
          friend?: number
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_visits_friend_fkey"
            columns: ["friend"]
            isOneToOne: false
            referencedRelation: "friends"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_visits_friend_fkey"
            columns: ["friend"]
            isOneToOne: false
            referencedRelation: "friends_latest_visit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_visits_friend_fkey"
            columns: ["friend"]
            isOneToOne: false
            referencedRelation: "Friends_Latest_Visit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_visits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      friends_latest_visit: {
        Row: {
          avatar: string | null
          frequency: Database["public"]["Enums"]["frequency"] | null
          id: number | null
          latest_date: string | null
          name: string | null
        }
        Relationships: []
      }
      Friends_Latest_Visit: {
        Row: {
          avatar: string | null
          frequency: Database["public"]["Enums"]["frequency"] | null
          id: number | null
          latest_date: string | null
          name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      frequency: "30" | "60" | "90" | "180"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
