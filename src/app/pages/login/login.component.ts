import { Component } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';


interface LoginFormData {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private service:AuthService, private router:Router) {}

  public loginForm: FormGroup<LoginFormData> = new FormGroup({
    username: new FormControl("", {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl("", {nonNullable: true, validators: [Validators.required]})
  })

  login(){
    const user = this.loginForm.value;
    if(user.username && user.password){
      this.service.login({username: user.username, password: user.password}).subscribe({
          next: value => {
            console.log(value);
            localStorage.setItem("token", value.token);
            this.router.navigateByUrl("/");
          },
          error: error => {
            console.log(error);
          }
        }
      );
    }
  }

}
