import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, filter, Observable, take } from 'rxjs';
import { Post, PostType } from "../models/post.model"

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly postUrl = 'http://localhost:3000/api/posts/';


  constructor(private http:HttpClient) { }


  public createNewPost(postType: PostType, gameId: string, gameName: string, username: string, reviewText: string, reviewScore: number){

    return this.http.post<Post>("http://localhost:3000/api/posts", {
    "postType" : postType,
    "gameId" :  gameId,
    "gameName" : gameName,
    "username" : username,
    "reviewText" : reviewText,
    "reviewScore" : reviewScore}).pipe(map((res)=>{return res}));

  }

  public getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(this.postUrl+id);
  }

  public deletePost(id: string): Observable<{token:string}> {
    return this.http.delete<{token:string}>(this.postUrl+id);
  }

  public getRecentPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl + "recent");
  }

  public editReview(postId:string, newText: string, newScore: number): Observable<Post> {
    return this.http.patch<Post>(this.postUrl + postId, {
      "newText": newText,
      "newScore": newScore
    });
  }

}
