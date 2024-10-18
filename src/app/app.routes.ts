import { Routes } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { SongFormComponent } from './song-form/song-form.component';
import { MusicPlayerComponent } from './music-player/music-player.component';

export const routes: Routes = [
    {path: '', redirectTo: '/album/list', pathMatch: 'full'},
    {path: 'album/list', component: AlbumListComponent},
    {path: 'album/addSong/:id', component: SongFormComponent},
    {path: 'album/player/:id', component: MusicPlayerComponent},
    {path: '**', redirectTo: '/album/list'}
];
