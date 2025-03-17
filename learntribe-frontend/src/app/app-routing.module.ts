import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './feature/home/home.component';
import {LecturesComponent} from './feature/lectures/lectures.component';
import {ContactComponent} from './feature/contact/contact.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule),
    //canActivate: [ authGuard ],
    // data: {
    //   jwtTokenPresent: false,
    //   redirectUrl: '/dashboard/chefs'
    // }
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'lectures',
    component: LecturesComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
