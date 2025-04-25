// edit-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User | null = null;
  originalData: any = {};
  profileModel = {
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    avatar: null as File | null
  };
  
  loading = true;
  saving = false;
  error: string | null = null;
  saveSuccess = false;
  avatarPreview: string | null = null;
  avatarChanged = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading = true;
    this.error = null;

    this.userService.getProfile().subscribe({
      next: (data: User) => {
        this.user = data;
        this.initModel(data);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.detail || 'Failed to load profile. Please try again.';
        this.loading = false;
        console.error('Error loading profile:', err);
        
        if (err.status === 401) {
          this.userService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  initModel(user: User): void {
    this.profileModel = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      bio: user.profile?.bio || '',
      avatar: null
    };
    
    this.originalData = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      bio: user.profile?.bio || ''
    };
    
    if (user.profile?.avatar) {
      this.avatarPreview = user.profile.avatar;
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (!file.type.match(/image\/*/) || file.size > 5000000) {
        this.error = 'Please select a valid image file (max 5MB)';
        return;
      }
      
      this.error = null;
      
      this.profileModel.avatar = file;
      this.avatarChanged = true;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  hasChanges(): boolean {
    return this.avatarChanged ||
      this.profileModel.first_name !== this.originalData.first_name ||
      this.profileModel.last_name !== this.originalData.last_name ||
      this.profileModel.email !== this.originalData.email ||
      this.profileModel.bio !== this.originalData.bio;
  }

  onSubmit(): void {
    if (!this.hasChanges()) {
      this.router.navigate(['/profile']);
      return;
    }
    
    this.saving = true;
    this.error = null;
    this.saveSuccess = false;
    
    const formData = new FormData();
    
    if (this.profileModel.first_name !== this.originalData.first_name) {
      formData.append('first_name', this.profileModel.first_name);
    }
    
    if (this.profileModel.last_name !== this.originalData.last_name) {
      formData.append('last_name', this.profileModel.last_name);
    }
    
    if (this.profileModel.email !== this.originalData.email) {
      formData.append('email', this.profileModel.email);
    }
    
    if (this.profileModel.bio !== this.originalData.bio) {
      formData.append('bio', this.profileModel.bio);
    }
    
    if (this.profileModel.avatar) {
      formData.append('avatar', this.profileModel.avatar, this.profileModel.avatar.name);
    }
    
    this.userService.updateProfile(formData).subscribe({
      next: (response) => {
        this.saveSuccess = true;
        this.saving = false;
        this.user = response;
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1500);
      },
      error: (err) => {
        this.error = typeof err === 'string' ? err : 'Failed to update profile. Please try again.';
        this.saving = false;
      }
    });
  }

  removeAvatar(): void {
    this.avatarPreview = null;
    this.profileModel.avatar = null;
    this.avatarChanged = true;
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}