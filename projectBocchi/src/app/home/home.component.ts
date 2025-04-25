// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Welcome to J-Rock Fan World 🎸';
  subtitle = 'Explore your favorite bands, buy merch, and get tickets to live shows!';
  
  navLinks = [
    { path: '/groups', label: 'View Groups' },
    { path: '/profile', label: 'Your Profile' }
  ];
}