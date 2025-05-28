import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

interface RegisterFormData{
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}


@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private service:AuthService, private router:Router) {}

  public registerForm: FormGroup<RegisterFormData> = new FormGroup({
    email: new FormControl("", { nonNullable: true, validators: [Validators.required]}),
    username: new FormControl("", {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl("", {nonNullable: true, validators: [Validators.required]})
  })

  register(){
    const user = this.registerForm.value;
    if(user.username && user.password && user.email){
      this.service.register({username: user.username, email:user.email , password: user.password}).subscribe({
          next: value => {
            console.log(value);
            this.router.navigateByUrl("/login");
          },
          error: error => {
            console.log(error);
          }
        }
      );
    }
  }

  goingToLogin(){
    this.router.navigateByUrl("/login");
  }

}
