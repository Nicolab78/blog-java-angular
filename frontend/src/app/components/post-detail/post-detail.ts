import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService, Post } from '../../services/post';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-detail.html',
  styleUrls: ['./post-detail.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: any[] = [];
  newComment = '';
  loading = true;
  isLoggedIn = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.loading = false;
      }
    });
    
    this.loadComments(id);
  }

  loadComments(postId: number): void {
    this.postService.getComments(postId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.error('Erreur chargement commentaires:', err);
      }
    });
  }

  submitComment(): void {
    if (!this.newComment.trim() || !this.post) {
      return;
    }

    this.postService.addComment(this.post.id, this.newComment).subscribe({
      next: () => {
        this.newComment = '';
        this.loadComments(this.post!.id);
        this.error = null;
      },
      error: (err) => {
        console.error('Erreur ajout commentaire:', err);
        this.error = 'Erreur lors de l\'ajout du commentaire';
      }
    });
  }
}