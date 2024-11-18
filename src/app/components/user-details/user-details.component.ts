import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alert = inject(AlertService);

  private userId!: number;

  public user!: User;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('userId')!;
    })

    this.getUserById()
  }

  public getUserById() {
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    })
  }

  public backToUserList() {
    this.router.navigate([`/user-list`]);
  }

  public deleteUser() {
    this.userService.deleteUserById(this.userId).subscribe(() => {
        this.alert.success('Пользователь удален')
        this.router.navigate(['/user-list']);
      },
      (error) => {
        this.alert.error('Ошибка сохранения пользователя');
      });
  }
}
