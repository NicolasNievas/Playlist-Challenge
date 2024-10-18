import { Component, inject, OnInit } from "@angular/core";
import { RestService } from "../services/rest.service";
import { Album } from "../models/album";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Song } from "../models/song";
import { Router } from "@angular/router";

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css',
})
export class AlbumListComponent implements OnInit{
  albums: Album[] = [];
  songs: Song[] = [];
  selectedAlbum: Album | null = null;
  private restService = inject(RestService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.restService.getAlbums().subscribe(albums => {
      this.albums = albums;
    });
  }

  player(albumId: string) {
    this.router.navigate(['album/player/', albumId]);
  }

  addSong(albumId: string) {
    this.router.navigate(['album/addSong/', albumId]);
  }
}
