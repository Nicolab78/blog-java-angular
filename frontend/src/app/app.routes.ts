import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./components/post-detail/post-detail').then(m => m.PostDetailComponent)
  }
];