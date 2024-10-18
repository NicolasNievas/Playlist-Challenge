import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private $URL = 'https://62ec30ee818ab252b6f9352d.mockapi.io/albums'

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.$URL);
  }

  getSongs(albumId: string): Observable<Song[]>{
    return this.http.get<Song[]>(`${this.$URL}/${albumId}/songs`);
  }

  addSong(albumId: string, song: Song): Observable<Song>{
    return this.http.post<Song>(`${this.$URL}/${albumId}/songs`, song);
  }
}
