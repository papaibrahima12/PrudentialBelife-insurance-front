import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { UserToken } from '../models/user-token';
import { Router } from '@angular/router';
import { MOCK_USERS } from '../variables/mock-user-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  public datas = {
    email: 'admin@prudential.com',
    password: 'Passer1234'
  };
  private tokenSubject: BehaviorSubject<UserToken | null>;
  private token: Observable<UserToken | null>;
  private _fetchedUser: BehaviorSubject<User[] | null> = new BehaviorSubject<User[] | null>(null);
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  userLoggedIn: { results : { token: UserToken, user: User}};
  private tokenPasswordSubject: BehaviorSubject<UserToken | null>;

  constructor(private router: Router, private readonly _httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.tokenSubject = new BehaviorSubject<UserToken | null>(JSON.parse(localStorage.getItem('user-token') || 'null'));
    this.tokenPasswordSubject = new BehaviorSubject<UserToken | null>(JSON.parse(localStorage.getItem('userPassword-token') || 'null'));
    this.token = this.tokenSubject.asObservable();
  }

  ngOnInit() {
    setInterval(() => this.checkTokenValidity(), 900000);
  }

  login(email: string, password: string) {
    const user = MOCK_USERS.find(u => u.email === email && password === this.datas.password);
    console.log(user);
    if (user) {
      const userToken: UserToken = { token: 'mock-token' }; // Generate a mock token
      localStorage.setItem('user-token', JSON.stringify(userToken));
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('role', user.role);
      this.tokenSubject.next(userToken);
      this.userLoggedIn = { results: { token: userToken, user } };
      return of(this.userLoggedIn);
    } else {
      return of(null);
    }
  }

  modifyPassword(data){
    return this._httpClient.post<any>(`${environment.apiUrl}/api/password/forgot`, data).pipe(
      map((response: any) =>{
        const userToken: UserToken = response.results;
        localStorage.setItem('userPassword-token', JSON.stringify(userToken));
        this.tokenPasswordSubject.next(userToken);
        return response;
      })
    )
  }

  changePassword(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenPasswordSubject.value ,
      })
    };
    return this._httpClient.post<any>(`${environment.apiUrl}/api/password/reset`, data, httpOptions).pipe(
      map((response: any) =>{
        console.log('the response', response);
        return response;
      })
    )
  }

  // changePassword(email:string): Promise<any>{

  // }
  private checkTokenValidity() {
    if (this.isTokenExpired()) {
      this.logout();
    }
  }

  get UserRole(): string {
    const userRole = this.userLoggedIn?.results?.user?.role;
    return userRole ?? 'null';
  }

  isTokenExpired(): boolean {
    const token = this.getStoredToken();
    if (!token) {
      return true;
    }
    const tokenData = this.decodeToken(token);
    if (!tokenData || !tokenData.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return tokenData.exp < currentTime;
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      return null;
    }
  }

  getStoredToken(): string | null {
    return localStorage.getItem('user-token');
  }

  getAllUsers(): Observable<User[]> {
    return of(MOCK_USERS).pipe(
      map(users => {
        this._fetchedUser.next(users);
        return users;
      })
    );
  }

  get fetchedUsers$(): Observable<User[] | null> {
    return this._fetchedUser.asObservable();
  }

  public get userValue(): User | null {
    return this.currentUserSubject.value;
  }

  public getUsername(): string {
    return this.currentUserSubject.value?.prenom + ' ' + this.currentUserSubject.value?.nom || '';
  }

  public getFirstName(): string {
    return this.currentUserSubject.value?.prenom || '';
  }

  public getLastName(): string {
    return this.currentUserSubject.value?.nom || '';
  }

  public getEmail(): string {
    return this.currentUserSubject.value?.email || '';
  }

  public getGender(): string {
    console.log('sujet', this.currentUserSubject)
    return this.currentUserSubject.value?.genre || '';
  }

  public getRole(): string {
    return this.currentUserSubject.value?.role || '';
  }

  public getAdresse(): string {
    return this.currentUserSubject.value?.adresse || '';
  }

  public getTelephone(): string {
    return this.currentUserSubject.value?.telephone || '';
  }

  public get tokenVal(): UserToken | null {
    return this.tokenSubject.value;
  }

  logout() {
    localStorage.removeItem('user-token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
