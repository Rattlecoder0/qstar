import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../app/components/navbar/navbar.component";
import { NgIf } from '@angular/common';

interface list_Details {
  waiting_no: number,
  customer_name: string,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  showNavbar: boolean = true;

  constructor(private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkNavbarVisibility(event.url);
      }
    });
  }
  ngOnInit(): void {
  } 

  checkNavbarVisibility(url: string) {
    const isLoginPage = url === '/login' || url === '/login/' ||  url === '/';
    this.showNavbar = !isLoginPage;
  }
}
