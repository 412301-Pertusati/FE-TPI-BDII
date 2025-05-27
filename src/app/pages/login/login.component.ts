import { Component } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

interface LoginFormData {
  mail: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private service:AuthService) {}

  public loginForm: FormGroup = new FormGroup<LoginFormData>({
    mail: new FormControl(""),
    password: new FormControl("")
  })

  login(){
    this.service.login(this.loginForm.value).subscribe(
      (next) => {

      },
      (error) => {
        console.log(error);
      }
    );
  }

}
