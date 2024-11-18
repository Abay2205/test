import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient)

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/${userId}`)
  }

  public deleteUserById(userId: number){
    return this.http.delete(this.apiUrl + `/${userId}`)
  }

  public editUserById(userId: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(this.apiUrl + `/${userId}`, user);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
