import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private supabase: SupabaseClient;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    this.supabase = createClient(
      'https://tqeazhwfhejsjgrtxhcw.supabase.co', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZWF6aHdmaGVqc2pncnR4aGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NjI4MzAsImV4cCI6MjA1NzAzODgzMH0.ios_a1uR880DaiTj07_lfFPYeuNjzR6kRcATFemvsC8'
    );
  }

  // ✅ Get login status as Observable
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // ✅ Admin Signup (Add Admin User)
  async signUpAdmin(nickName: string, email: string, password: string) {
    const { data, error } = await this.supabase
      .from('AdminUsers')
      .insert([{ nickName, email, password }]); // Store password as plain text (BAD: Use hashing later!)

    if (error) {
      console.error('Signup Error:', error.message);
      return false;
    }
    return true;
  }

  // ✅ Admin Login (Check if credentials exist)
  async loginAdmin(email: string, password: string) {
    const { data, error } = await this.supabase
      .from('AdminUsers')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single(); // Fetch only one matching admin

    if (error || !data) {
      console.error('Login Failed:', error?.message || 'Invalid credentials');
      return false;
    }

    this.loggedIn.next(true); // Set login state to true
    return true;
  }

  // ✅ Logout
  logoutAdmin() {
    this.loggedIn.next(false);
  }
}
