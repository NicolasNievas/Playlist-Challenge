import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { Song } from '../models/song';

@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './song-form.component.html',
  styleUrl: './song-form.component.css',
})
export class SongFormComponent implements OnInit {
  song: Song = {
    id: '',
    name: '',
    duration: 1,
    orderIndex: 1,
    createdAt: new Date().toISOString().split('T')[0],
    user: '',
    albumId: ''
  }
  albumId: string;
  private restService = inject(RestService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  constructor() { 
    this.albumId = '';
  }

  ngOnInit(): void {
    this.albumId = this.route.snapshot.paramMap.get('id') || '';
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.song.albumId = this.albumId;
      this.restService.addSong(this.albumId, this.song).subscribe({
        next: () => {
          this.router.navigate(['album/list']);
        },
        error: (error) => {
          console.error('Error adding song:', error);
        }
      });
    }
  }
  onCancel() {
    this.router.navigate(['album/list']);
  }
}
