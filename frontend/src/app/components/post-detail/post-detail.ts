import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService, Post } from '../../services/post';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.html',
  styleUrls: ['./post-detail.css']
})
export class PostDetailComponent {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  post?: Post;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Post introuvable';
        this.loading = false;
      }
    });
  }
}