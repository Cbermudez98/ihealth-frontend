import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    Password: ['',[Validators.required]],
  });
  constructor(private formBuilder: FormBuilder, private router:Router) {}

  ngOnInit(): void {}

  login(){
    if (this.loginForm.valid) {
      alert("VA PIOLA")
      this.router.navigateByUrl('/register');
      this.loginForm.reset();
    }else{
      alert("Error")
    }
  }

}
