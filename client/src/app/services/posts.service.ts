import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from "../models/post.model"

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  http: any;
  private readonly postUrl = 'http://localhost:3000/api/posts/';

  constructor() { }


  public addNewPost(post: Post): string {
    return this.http.post("http://localhost:3000/api/posts", {
    "postType" : post.type,
    "gameId" : post.gameId,
    "userId" : post.userId,
    "reviewText" : post.reviewText,
    "reviewScore" : post.rating} );
  }

  public getPostById(id: string): Observable<Post> {
    return this.http.get(this.postUrl+id);
  }

  //getPostsByUserId
  //getPostsByGameId
}
