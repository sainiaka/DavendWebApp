import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  page: string = "/";

  constructor() {}

  ngOnInit(): void {
    const urlPath = window.location.pathname.toLowerCase();
    this.page = urlPath.split('/')[1] || 'home';
  }
}
