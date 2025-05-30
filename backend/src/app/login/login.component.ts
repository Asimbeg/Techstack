import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  ngOnInit(): void {
  }

  loginData = {
    login: '',
    password: '',
  };

  errorMessage = '';

    constructor(private http:HttpClient) { }
    onSubmit() {
    this.http.post('http://localhost:3000/login', this.loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        alert(res.message);
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      }
    });
  }


}
