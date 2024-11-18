import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user.interface';
import {NgClass, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    FormsModule,
    MatIcon
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  private userService = inject(UserService);
  private router = inject(Router);

  public users!: User[];
  public searchQuery: string = '';
  public currentPage: number = 1;
  public pageSize: number = 5;
  public totalPages: number = 1;
  public visibleUsers: any[] = []
  public filteredUsers: User[] = [];

  ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = [...this.users];
      this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
      this.updateVisibleUsers();
    });
  }

  public filterUsers() {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = 1;
    this.updateVisibleUsers();
  }

  public updateVisibleUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.visibleUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  public changePage(direction: number) {
    this.currentPage += direction;
    this.updateVisibleUsers();
  }

  public navigateToUserForm(userId?: number) {
    this.router.navigate([`/user-form/${userId}`]);
  }

  public navigateToUserDetails(userId: number) {
    this.router.navigate([`user-details/${userId}`]);
  }
}
