// TypeScript types for Supabase database
// Generated from schema - update as database evolves

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          resident_state_code: string | null;
          phone_number: string | null;
          onboarding_completed: boolean;
          subscription_tier: "free" | "premium" | "pro";
          subscription_expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          resident_state_code?: string | null;
          phone_number?: string | null;
          onboarding_completed?: boolean;
          subscription_tier?: "free" | "premium" | "pro";
          subscription_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          resident_state_code?: string | null;
          phone_number?: string | null;
          onboarding_completed?: boolean;
          subscription_tier?: "free" | "premium" | "pro";
          subscription_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      states: {
        Row: {
          id: string;
          code: string;
          name: string;
          country: "US" | "CA";
          portal_url: string | null;
          flag_icon_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          country?: "US" | "CA";
          portal_url?: string | null;
          flag_icon_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          country?: "US" | "CA";
          portal_url?: string | null;
          flag_icon_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      species: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon_name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          icon_name?: string | null;
          created_at?: string;
        };
      };
      state_species: {
        Row: {
          id: string;
          state_id: string;
          species_id: string;
          season_year: number;
          application_deadline: string;
          draw_date: string | null;
          point_type: "preference" | "bonus" | "hybrid" | "none" | null;
          base_fee: number | null;
          nonresident_fee: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          state_id: string;
          species_id: string;
          season_year: number;
          application_deadline: string;
          draw_date?: string | null;
          point_type?: "preference" | "bonus" | "hybrid" | "none" | null;
          base_fee?: number | null;
          nonresident_fee?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          state_id?: string;
          species_id?: string;
          season_year?: number;
          application_deadline?: string;
          draw_date?: string | null;
          point_type?: "preference" | "bonus" | "hybrid" | "none" | null;
          base_fee?: number | null;
          nonresident_fee?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_states: {
        Row: {
          id: string;
          user_id: string;
          state_id: string;
          is_resident: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          state_id: string;
          is_resident?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          state_id?: string;
          is_resident?: boolean;
          created_at?: string;
        };
      };
      user_species: {
        Row: {
          id: string;
          user_id: string;
          species_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          species_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          species_id?: string;
          created_at?: string;
        };
      };
      user_applications: {
        Row: {
          id: string;
          user_id: string;
          state_species_id: string;
          season_year: number;
          status: "not_started" | "in_progress" | "submitted" | "drawn" | "unsuccessful" | "unknown";
          confirmation_number: string | null;
          notes: string | null;
          submitted_at: string | null;
          result_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          state_species_id: string;
          season_year: number;
          status?: "not_started" | "in_progress" | "submitted" | "drawn" | "unsuccessful" | "unknown";
          confirmation_number?: string | null;
          notes?: string | null;
          submitted_at?: string | null;
          result_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          state_species_id?: string;
          season_year?: number;
          status?: "not_started" | "in_progress" | "submitted" | "drawn" | "unsuccessful" | "unknown";
          confirmation_number?: string | null;
          notes?: string | null;
          submitted_at?: string | null;
          result_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_points: {
        Row: {
          id: string;
          user_id: string;
          state_id: string;
          species_id: string;
          season_year: number;
          preference_points: number;
          bonus_points: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          state_id: string;
          species_id: string;
          season_year: number;
          preference_points?: number;
          bonus_points?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          state_id?: string;
          species_id?: string;
          season_year?: number;
          preference_points?: number;
          bonus_points?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_credentials: {
        Row: {
          id: string;
          user_id: string;
          state_id: string;
          username_encrypted: string;
          password_encrypted: string;
          notes: string | null;
          last_used_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          state_id: string;
          username_encrypted: string;
          password_encrypted: string;
          notes?: string | null;
          last_used_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          state_id?: string;
          username_encrypted?: string;
          password_encrypted?: string;
          notes?: string | null;
          last_used_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      notification_preferences: {
        Row: {
          id: string;
          user_id: string;
          email_enabled: boolean;
          push_enabled: boolean;
          deadline_reminder_days: number;
          weekly_digest: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email_enabled?: boolean;
          push_enabled?: boolean;
          deadline_reminder_days?: number;
          weekly_digest?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email_enabled?: boolean;
          push_enabled?: boolean;
          deadline_reminder_days?: number;
          weekly_digest?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: "deadline_reminder" | "draw_result" | "system" | "update";
          title: string;
          message: string;
          read: boolean;
          action_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "deadline_reminder" | "draw_result" | "system" | "update";
          title: string;
          message: string;
          read?: boolean;
          action_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: "deadline_reminder" | "draw_result" | "system" | "update";
          title?: string;
          message?: string;
          read?: boolean;
          action_url?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      encrypt_credential: {
        Args: {
          plaintext: string;
          encryption_key: string;
        };
        Returns: string;
      };
      decrypt_credential: {
        Args: {
          encrypted: string;
          encryption_key: string;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
