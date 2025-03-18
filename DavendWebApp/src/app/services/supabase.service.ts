import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://tqeazhwfhejsjgrtxhcw.supabase.co', // Supabase URL
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZWF6aHdmaGVqc2pncnR4aGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NjI4MzAsImV4cCI6MjA1NzAzODgzMH0.ios_a1uR880DaiTj07_lfFPYeuNjzR6kRcATFemvsC8' // Supabase Key
    );
  }

  // ADMIN AUTHENTICATION

  // Admin Signup
  async signUpAdmin(nickName: string, email: string, password: string) {
    const { data, error } = await this.supabase
      .from('AdminUsers')
      .insert([{ nickName, email, password }]);

    if (error) {
      console.error('Signup Error:', error.message);
      return false;
    }
    return true;
  }

  // Admin Login
  async loginAdmin(email: string, password: string) {
    const { data, error } = await this.supabase
      .from('AdminUsers')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !data) {
      console.error('Login Failed:', error?.message || 'Invalid credentials');
      return false;
    }
    return true;
  }

  // Logout (No Supabase backend logout needed for database auth)
  logoutAdmin() {
    return true; // Placeholder for future improvements
  }

  // PRODUCT MANAGEMENT

  // Fetch all products
  async getProducts() {
    const { data, error } = await this.supabase.from('Products').select('*');
    if (error) {
      console.error('Error fetching products:', error.message);
      throw error;
    }
    return data || [];
  }

  // Add a new product
  async addProduct(name: string, description: string, qty: number, imageURL: string) {
    const { data, error } = await this.supabase
      .from('Products')
      .insert([{ name, description, qty, imageURL }]);
    
    if (error) {
      console.error('Error adding product:', error.message);
      throw error;
    }
    return data;
  }

  // Update an existing product
  async updateProduct(id: string, name: string, description: string, qty: number, imageURL: string) {
    const { data, error } = await this.supabase
      .from('Products')
      .update({ name, description, qty, imageURL })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating product:', error.message);
      throw error;
    }
    return data;
  }

  // Delete a product
  async deleteProduct(id: string) {
    const { error } = await this.supabase.from('Products').delete().eq('id', id);
    if (error) {
      console.error('Error deleting product:', error.message);
      throw error;
    }
  }
}
