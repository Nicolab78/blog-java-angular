import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  {
  path: '',
  component: HomeComponent
},
{
  path: 'home',
  component: HomeComponent
},

  {
    path: 'posts',
    component: PostListComponent
  },

  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./components/post-detail/post-detail').then(m => m.PostDetailComponent)
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent  
  }

];