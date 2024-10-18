import { Component, inject, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../models/song';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css',
})
export class MusicPlayerComponent implements OnInit{
  songs: Song[] = [];
  currentSong: Song | null = null;
  currentTime: number = 0;
  isPlaying: boolean = false;
  albumId: string = '';
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private restService = inject(RestService);

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id') || '';
    this.loadSongs();
  }

  loadSongs() {
    this.restService.getSongs(this.albumId).subscribe(songs => {
      this.songs = songs.sort((a, b) => a.orderIndex - b.orderIndex);
      if (this.songs.length > 0) {
        this.playSong(this.songs[0]);
      }
    });
  }

  playSong(song: Song) {
    this.currentSong = song;
    this.currentTime = 0;
    this.isPlaying = true;
    this.startTimer();
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startTimer();
    }
  }

  startTimer() {
    if (this.isPlaying) {
      setTimeout(() => {
        if (this.currentTime < this.currentSong!.duration) {
          this.currentTime++;
          this.startTimer();
        } else {
          this.nextSong();
        }
      }, 1000);
    }
  }

  nextSong() {
    const currentIndex = this.songs.findIndex(song => song.id === this.currentSong!.id);
    if (currentIndex < this.songs.length - 1) {
      this.playSong(this.songs[currentIndex + 1]);
    } else {
      this.isPlaying = false;
    }
  }

  closePlayer() {
    this.router.navigate(['album/list']);
  }

}
