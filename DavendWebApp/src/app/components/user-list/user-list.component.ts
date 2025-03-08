import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.users = await this.supabaseService.getUsers();
  }

  async addUser() {
    await this.supabaseService.addUser('John Doe', 'medina.khe@gmail.com');
    this.users = await this.supabaseService.getUsers(); // Refresh users
  }
}
