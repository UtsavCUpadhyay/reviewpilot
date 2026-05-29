export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          plan: 'trial' | 'starter' | 'pro' | 'agency'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete'
          trial_ends_at: string
          locations_limit: number
          onboarding_completed: boolean
          last_login_at: string
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string; email: string }
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
      }
      locations: {
        Row: {
          id: string
          user_id: string
          name: string
          business_type: string | null
          website: string | null
          phone: string | null
          address: string | null
          google_place_id: string | null
          google_account_id: string | null
          google_location_id: string | null
          google_access_token: string | null
          google_refresh_token: string | null
          google_token_expires_at: string | null
          google_connected: boolean
          auto_respond: boolean
          auto_respond_threshold: number
          response_tone: 'professional' | 'friendly' | 'formal' | 'casual'
          avg_rating: number
          total_reviews: number
          total_responded: number
          last_polled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['locations']['Row']> & { user_id: string; name: string }
        Update: Partial<Database['public']['Tables']['locations']['Row']>
      }
      reviews: {
        Row: {
          id: string
          location_id: string
          google_review_id: string
          reviewer_name: string | null
          reviewer_photo_url: string | null
          rating: number
          content: string | null
          review_date: string
          responded: boolean
          response_text: string | null
          response_generated_at: string | null
          response_posted_at: string | null
          response_source: 'ai' | 'manual' | 'edited_ai' | null
          response_edited: boolean
          status: 'pending' | 'ai_generated' | 'approved' | 'posted' | 'skipped' | 'failed'
          sentiment: 'positive' | 'neutral' | 'negative' | null
          keywords: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['reviews']['Row']> & {
          location_id: string
          google_review_id: string
          rating: number
          review_date: string
        }
        Update: Partial<Database['public']['Tables']['reviews']['Row']>
      }
      response_settings: {
        Row: {
          id: string
          location_id: string
          business_name: string | null
          business_type: string | null
          owner_name: string | null
          custom_instructions: string | null
          include_reviewer_name: boolean
          include_business_name: boolean
          max_response_length: number
          positive_template: string | null
          neutral_template: string | null
          negative_template: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['response_settings']['Row']> & { location_id: string }
        Update: Partial<Database['public']['Tables']['response_settings']['Row']>
      }
      automation_log: {
        Row: {
          id: string
          user_id: string | null
          location_id: string | null
          action: string
          status: 'success' | 'failed' | 'skipped' | 'pending'
          metadata: Json
          error_message: string | null
          duration_ms: number | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['automation_log']['Row']> & { action: string; status: string }
        Update: never
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Location = Database['public']['Tables']['locations']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type ResponseSettings = Database['public']['Tables']['response_settings']['Row']
