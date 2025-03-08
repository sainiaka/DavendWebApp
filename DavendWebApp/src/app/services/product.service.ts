import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://tqeazhwfhejsjgrtxhcw.supabase.co', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZWF6aHdmaGVqc2pncnR4aGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NjI4MzAsImV4cCI6MjA1NzAzODgzMH0.ios_a1uR880DaiTj07_lfFPYeuNjzR6kRcATFemvsC8'
    );
  }

  async getProducts() {
    const { data, error } = await this.supabase.from('Products').select('*');
    if (error) throw error;
    return data || [];
  }

  async addProduct(name: string, description: string, qty: number, imageURL: string) {
    const { data, error } = await this.supabase
      .from('Products')
      .insert([{ name, description, qty, imageURL }]);
    
    if (error) throw error;
    return data;
  }

  async updateProduct(id: string, name: string, description: string, qty: number, imageURL: string) {
    const { data, error } = await this.supabase
      .from('Products')
      .update({ name, description, qty, imageURL })
      .eq('id', id);
    
    if (error) throw error;
    return data;
  }

  async deleteProduct(id: string) {
    const { error } = await this.supabase.from('Products').delete().eq('id', id);
    if (error) throw error;
  }
}
