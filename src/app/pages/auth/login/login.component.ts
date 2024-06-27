import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup ;
  submitted = false;
  returnUrl: string;
  role: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


  constructor(
    private _router:Router,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
  ) {

  }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    console.log(this.returnUrl);
  }

   get f() {
    return this.loginForm.controls;
  }

  getErrorMessage(control: AbstractControl): string {
    if (!control || control.valid) {
      return '';
    }
    // Required always comes first
    if (control.hasError('required')) {
      return "ce champs est requis";
    }
    if (control.hasError('email')) {
      return "l'email doit etre valide";
    }
    if (control.hasError("password")) {
      return "le mot de passe doit etre valide";
    }
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }


  login(){
    this.submitted = true;
    if (!this.loginForm) {
      return;
    }
    const payload = Object.assign({}, this.loginForm.value);
    console.log(payload)
   const response =  this.userService.login(payload?.email, payload?.password);
    if(response) {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success',
        //   text: 'Connexion réussie avec succès',
        //   timer: 1000
        // });
        // console.log('user', response);
        this._router.navigateByUrl('home/dashboardAdmin');
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Login et/ou Mot de passe incorrects',
            timer: 1000
          });
          console.log('Erreur de traitement !');
        }
  }
      reloadPage(): void {
    window.location.reload();
  }

}
