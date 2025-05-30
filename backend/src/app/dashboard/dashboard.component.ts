import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com'
  };

  showPortfolio = false;

  portfolioData = {
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    values: [10000, 12000, 11000, 15000, 14000]
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  openPortfolio() {
    this.showPortfolio = true;
  }
}
