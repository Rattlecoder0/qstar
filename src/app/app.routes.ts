import { Routes } from '@angular/router';
import { DahsboardComponent } from '../components/dahsboard/dahsboard.component';
import { LoginComponent } from '../login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DahsboardComponent },
];
