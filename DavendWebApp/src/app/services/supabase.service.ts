import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://tqeazhwfhejsjgrtxhcw.supabase.co',  // Supabase URL
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZWF6aHdmaGVqc2pncnR4aGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NjI4MzAsImV4cCI6MjA1NzAzODgzMH0.ios_a1uR880DaiTj07_lfFPYeuNjzR6kRcATFemvsC8'  // Supabase Key
    );
  }

  async getUsers() {
    let { data, error } = await this.supabase.from('users').select('*');
    if (error) throw error;
    return data || [];
  }

  async addUser(name: string, email: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: 'password123' // Use a secure password handling method
    });
  
    if (error) {
      console.error('Signup Error:', error.message);
      return;
    }
  
    const user = data?.user;
  
    if (user) {
      await this.supabase
        .from('users')
        .insert([{ name: name, email: user.email }]);
    }
  }
  
}
