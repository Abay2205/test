import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../../interfaces/user.interface';
import {NgIf} from '@angular/common';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private alert = inject(AlertService)

  public userId!: number;

  public userForm!: FormGroup;
  public isEditMode = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('userId')!;
    })
    this.initializeForm();

    if (this.userId) {
      this.isEditMode = true;
      this.loadUserData(this.userId);
    }
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        suite: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', Validators.required],
        geo: this.fb.group({
          lat: ['', Validators.required],
          lng: ['', Validators.required]
        })
      }),
      company: this.fb.group({
        name: ['', Validators.required],
        catchPhrase: ['', Validators.required],
        bs: ['', Validators.required]
      })
    });
  }


  private loadUserData(userId: number) {
    this.userService.getUserById(userId).subscribe((user: User) => {
      this.userForm.patchValue(user);
    });
  }

  public saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    console.log(this.userForm.getRawValue());

    const formData = this.userForm.value;

    if (this.isEditMode) {
      this.userService.editUserById(this.userId, formData).subscribe(() => {
          this.alert.success("Пользователь обновлен")
          this.router.navigate(['/users']);
        },
        (error) => {
          this.alert.error('Ошибка обновления пользователя');
        });
    } else {
      this.userService.createUser(formData).subscribe(() => {
          this.alert.success('Пользователь создан');
          this.router.navigate(['/users']);
        },
        (error) => {
          this.alert.error('Ошибка сохранения пользователя');
        });
    }
  }

  public backToUserList() {
    this.router.navigate([`/user-list`]);
  }

}
