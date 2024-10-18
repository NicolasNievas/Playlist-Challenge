export interface Song {
    id: string;
    createdAt: string;
    albumId: string;
    name: string;
    duration: number;
    orderIndex: number;
    user: string;
}