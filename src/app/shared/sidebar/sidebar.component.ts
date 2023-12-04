import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

interface Imenu {
  title: string;
  icon: string;
  link: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
isOpened: boolean=false ;
  constructor(private _AuthService: AuthService) {}
  isAdmin(): boolean {
    return this._AuthService.role == 'SuperAdmin' ? true : false;
  }

  isUser(): boolean {
    return this._AuthService.role == 'SystemUser' ? true : false;
  }

  menu: Imenu[] = [
    {
      title: 'Home',
      icon: 'fa-solid fa-house',
      link: '/dashboard/home',
      isActive: this.isAdmin() || this.isUser(),
    },
    {
      title: 'Users',
      icon: 'fa-solid fa-users',
      link: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
      title: 'Recipes',
      icon: 'fa-solid fa-cubes-stacked',
      link: '/dashboard/admin/recipes',
      isActive: this.isAdmin(),
    },
    {
      title: 'Categories',
      icon: 'fa-solid fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isAdmin(),
    },
    {
      title: 'user recipes',
      icon: 'fa-solid fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isUser(),
    },
    {
      title: 'favorites',
      icon: 'fa-solid fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isUser(),
    },
  ];
}