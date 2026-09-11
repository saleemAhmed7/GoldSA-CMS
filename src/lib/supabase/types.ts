export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string | null;
          avatar_url: string | null;
          status: "active" | "suspended" | "inactive";
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          phone?: string | null;
          avatar_url?: string | null;
          status?: "active" | "suspended" | "inactive";
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string | null;
          avatar_url?: string | null;
          status?: "active" | "suspended" | "inactive";
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      roles: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      permissions: {
        Row: {
          id: string;
          name: string;
          module: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          module: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          module?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      role_permissions: {
        Row: {
          id: string;
          role_id: string;
          permission_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          role_id: string;
          permission_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role_id?: string;
          permission_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          parent_id: string | null;
          slug: string;
          name_ar: string;
          name_tr: string;
          name_en: string;
          description_ar: string | null;
          description_tr: string | null;
          description_en: string | null;
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          parent_id?: string | null;
          slug: string;
          name_ar: string;
          name_tr: string;
          name_en: string;
          description_ar?: string | null;
          description_tr?: string | null;
          description_en?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          parent_id?: string | null;
          slug?: string;
          name_ar?: string;
          name_tr?: string;
          name_en?: string;
          description_ar?: string | null;
          description_tr?: string | null;
          description_en?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      suppliers: {
        Row: {
          id: string;
          name: string;
          code: string;
          contact_person: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          city: string | null;
          country: string | null;
          tax_id: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          contact_person?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          country?: string | null;
          tax_id?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          contact_person?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          country?: string | null;
          tax_id?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          supplier_id: string | null;
          sku: string;
          slug: string;
          title_ar: string;
          title_tr: string;
          title_en: string;
          description_ar: string | null;
          description_tr: string | null;
          description_en: string | null;
          karat: "24K" | "22K" | "18K" | "14K";
          weight_grams: number;
          labor_fee_try: number;
          additional_cost_try: number;
          stock_quantity: number;
          low_stock_threshold: number;
          status: "draft" | "active" | "archived";
          is_visible: boolean;
          is_featured: boolean;
          gia_certificate_no: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          supplier_id?: string | null;
          sku: string;
          slug: string;
          title_ar: string;
          title_tr: string;
          title_en: string;
          description_ar?: string | null;
          description_tr?: string | null;
          description_en?: string | null;
          karat: "24K" | "22K" | "18K" | "14K";
          weight_grams: number;
          labor_fee_try: number;
          additional_cost_try?: number;
          stock_quantity?: number;
          low_stock_threshold?: number;
          status?: "draft" | "active" | "archived";
          is_visible?: boolean;
          is_featured?: boolean;
          gia_certificate_no?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          supplier_id?: string | null;
          sku?: string;
          slug?: string;
          title_ar?: string;
          title_tr?: string;
          title_en?: string;
          description_ar?: string | null;
          description_tr?: string | null;
          description_en?: string | null;
          karat?: "24K" | "22K" | "18K" | "14K";
          weight_grams?: number;
          labor_fee_try?: number;
          additional_cost_try?: number;
          stock_quantity?: number;
          low_stock_threshold?: number;
          status?: "draft" | "active" | "archived";
          is_visible?: boolean;
          is_featured?: boolean;
          gia_certificate_no?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt_text: string | null;
          is_primary: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          alt_text?: string | null;
          is_primary?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          url?: string;
          alt_text?: string | null;
          is_primary?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          sku: string;
          title: string;
          weight_grams: number;
          labor_fee_try: number;
          additional_cost_try: number;
          stock_quantity: number;
          options: Json | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          sku: string;
          title: string;
          weight_grams: number;
          labor_fee_try: number;
          additional_cost_try?: number;
          stock_quantity?: number;
          options?: Json | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          sku?: string;
          title?: string;
          weight_grams?: number;
          labor_fee_try?: number;
          additional_cost_try?: number;
          stock_quantity?: number;
          options?: Json | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      inventory: {
        Row: {
          id: string;
          product_id: string | null;
          variant_id: string | null;
          location: string;
          movement_type: "stock_in" | "stock_out" | "reservation" | "adjustment" | "return";
          quantity: number;
          reference_no: string | null;
          performed_by: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          variant_id?: string | null;
          location?: string;
          movement_type: "stock_in" | "stock_out" | "reservation" | "adjustment" | "return";
          quantity: number;
          reference_no?: string | null;
          performed_by?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          variant_id?: string | null;
          location?: string;
          movement_type?: "stock_in" | "stock_out" | "reservation" | "adjustment" | "return";
          quantity?: number;
          reference_no?: string | null;
          performed_by?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string | null;
          phone: string | null;
          vip_tier: "standard" | "gold" | "vip_black";
          address_line: string | null;
          city: string | null;
          country: string | null;
          total_orders_count: number;
          total_spent_try: number;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          full_name: string;
          email?: string | null;
          phone?: string | null;
          vip_tier?: "standard" | "gold" | "vip_black";
          address_line?: string | null;
          city?: string | null;
          country?: string | null;
          total_orders_count?: number;
          total_spent_try?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          full_name?: string;
          email?: string | null;
          phone?: string | null;
          vip_tier?: "standard" | "gold" | "vip_black";
          address_line?: string | null;
          city?: string | null;
          country?: string | null;
          total_orders_count?: number;
          total_spent_try?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          order_no: string;
          customer_id: string | null;
          currency_code: string;
          fx_rate_to_try: number;
          subtotal_amount: number;
          tax_amount: number;
          discount_amount: number;
          total_amount: number;
          order_status: "pending" | "processing" | "fulfillment" | "shipped" | "completed" | "cancelled";
          payment_status: "pending" | "verified" | "refunded" | "failed";
          shipping_address: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          order_no: string;
          customer_id?: string | null;
          currency_code?: string;
          fx_rate_to_try?: number;
          subtotal_amount: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount: number;
          order_status?: "pending" | "processing" | "fulfillment" | "shipped" | "completed" | "cancelled";
          payment_status?: "pending" | "verified" | "refunded" | "failed";
          shipping_address?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          order_no?: string;
          customer_id?: string | null;
          currency_code?: string;
          fx_rate_to_try?: number;
          subtotal_amount?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount?: number;
          order_status?: "pending" | "processing" | "fulfillment" | "shipped" | "completed" | "cancelled";
          payment_status?: "pending" | "verified" | "refunded" | "failed";
          shipping_address?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          variant_id: string | null;
          title_snapshot: string;
          sku_snapshot: string;
          karat_snapshot: string;
          weight_grams_snapshot: number;
          unit_price_try: number;
          quantity: number;
          total_price_try: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          variant_id?: string | null;
          title_snapshot: string;
          sku_snapshot: string;
          karat_snapshot: string;
          weight_grams_snapshot: number;
          unit_price_try: number;
          quantity?: number;
          total_price_try: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          variant_id?: string | null;
          title_snapshot?: string;
          sku_snapshot?: string;
          karat_snapshot?: string;
          weight_grams_snapshot?: number;
          unit_price_try?: number;
          quantity?: number;
          total_price_try?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      gold_rates: {
        Row: {
          id: string;
          rate_24k_try: number;
          rate_22k_try: number;
          rate_18k_try: number;
          gold_usd_per_ounce: number;
          usd_try_fx_rate: number;
          source: string;
          is_live: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          rate_24k_try: number;
          rate_22k_try: number;
          rate_18k_try: number;
          gold_usd_per_ounce: number;
          usd_try_fx_rate: number;
          source?: string;
          is_live?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          rate_24k_try?: number;
          rate_22k_try?: number;
          rate_18k_try?: number;
          gold_usd_per_ounce?: number;
          usd_try_fx_rate?: number;
          source?: string;
          is_live?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      currencies: {
        Row: {
          id: string;
          code: string;
          name: string;
          symbol: string;
          fx_rate_to_try: number;
          is_active: boolean;
          is_base: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          symbol: string;
          fx_rate_to_try?: number;
          is_active?: boolean;
          is_base?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          symbol?: string;
          fx_rate_to_try?: number;
          is_active?: boolean;
          is_base?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          description: string | null;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          description?: string | null;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          description?: string | null;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          ip_address: string | null;
          user_agent: string | null;
          old_values: Json | null;
          new_values: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          old_values?: Json | null;
          new_values?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          old_values?: Json | null;
          new_values?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
