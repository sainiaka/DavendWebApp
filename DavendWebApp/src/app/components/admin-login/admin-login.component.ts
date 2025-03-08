import { Component } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  logIn: boolean = true;
  isLoggedIn: boolean = false;

  constructor(private adminAuthService: AdminAuthService) {
    this.adminAuthService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  async signUp() {
    const success = await this.adminAuthService.signUpAdmin(this.username, this.email, this.password);
    if (success) {
      alert('Admin registered successfully!');
    } else {
      alert('Signup failed. Try a different username.');
    }
  }

  async login() {
    const success = await this.adminAuthService.loginAdmin(this.email, this.password);
    if (success) {
      alert('Login successful!');
    } else {
      alert('Invalid username or password.');
    }
  }

  changeMode(value: boolean) {
    this.logIn = value
  }

  logout() {
    this.adminAuthService.logoutAdmin();
  }
}
