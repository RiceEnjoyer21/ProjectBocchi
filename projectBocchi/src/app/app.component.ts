// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <header class="main-header">
      <div class="logo">
        <a routerLink="/">J-Rock Fan World</a>
      </div>
      <nav class="main-nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
        <a routerLink="/groups" routerLinkActive="active">Groups</a>
        <a routerLink="/profile" routerLinkActive="active">Profile</a>
      </nav>
    </header>
    
    <main>
      <router-outlet></router-outlet>
    </main>
    
    <footer class="main-footer">
      <p>&copy; {{currentYear}} J-Rock Fan World. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background-color: #212121;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      color: white;
    }
    
    .logo a {
      font-size: 1.5rem;
      font-weight: bold;
      color: #e91e63;
      text-decoration: none;
      display: flex;
      align-items: center;
    }
    
    .logo a::after {
      content: '🎸';
      margin-left: 8px;
      font-size: 1.2rem;
    }
    
    .main-nav {
      display: flex;
      gap: 20px;
    }
    
    .main-nav a {
      color: #e0e0e0;
      text-decoration: none;
      padding: 8px 12px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    
    .main-nav a:hover {
      color: #e91e63;
      background-color: rgba(233, 30, 99, 0.1);
    }
    
    .main-nav a.active {
      color: #e91e63;
      background-color: rgba(233, 30, 99, 0.1);
    }
    
    main {
      min-height: calc(100vh - 130px);
      padding: 20px;
      background-color: #f5f5f5;
    }
    
    .main-footer {
      background-color: #212121;
      padding: 16px 24px;
      text-align: center;
      color: #e0e0e0;
    }
    
    @media (max-width: 768px) {
      .main-header {
        flex-direction: column;
        padding: 12px;
      }
      
      .logo {
        margin-bottom: 12px;
      }
      
      .main-nav {
        width: 100%;
        justify-content: space-around;
      }
    }
  `]
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}