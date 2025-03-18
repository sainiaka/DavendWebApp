import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.getStoredLoginState());

  constructor(private supabaseAuth: SupabaseService) {}

  private getStoredLoginState(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  async signUpAdmin(nickName: string, email: string, password: string) {
    const success = await this.supabaseAuth.signUpAdmin(nickName, email, password);
    return success;
  }

  async loginAdmin(email: string, password: string) {
    const success = await this.supabaseAuth.loginAdmin(email, password);
    if (success) {
      localStorage.setItem('isLoggedIn', 'true');
      this.loggedIn.next(true);
    }
    return success;
  }

  logoutAdmin() {
    this.supabaseAuth.logoutAdmin(); // Calls the service (currently a placeholder)
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false);
    location.reload();
  }
}
