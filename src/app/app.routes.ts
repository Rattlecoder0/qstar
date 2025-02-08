import { Routes } from '@angular/router';
import { DahsboardComponent } from '../app/components/dahsboard/dahsboard.component';
import { LoginComponent } from '../app/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DahsboardComponent },
];
