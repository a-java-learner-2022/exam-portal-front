import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';

const routes: Routes = [
  {path:'',component:HomeComponent, pathMatch: 'full'},
  {path:"signup",component:SignupComponent, pathMatch: 'full'},
  {path:'login', component:LoginComponent, pathMatch: 'full'},
  {path:'footer', component:FooterComponent, pathMatch: 'full'},
  {
    path:'admin', 
    component:DashboardComponent, 
    canActivate:[AdminGuard],
    children:[
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path:'',
        component: WelcomeComponent,
      },
    ],
   
  },
  {path:'user-dashboard', component: UserDashboardComponent, pathMatch: 'full', canActivate:[UserGuard]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
