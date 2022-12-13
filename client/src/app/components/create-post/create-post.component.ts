import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  review: boolean = false;
  createPostForm: FormGroup;
  public games;

  constructor(private gameService: GamesService, private formBuilder: FormBuilder){
    this.createPostForm = this.formBuilder.group({
      game: ['', [Validators.required]],
      type: ['', [Validators.required]],
      reviewScore: ['', [Validators.min(1.0), Validators.max(10.0)]],
      reviewText: ['', []]
    });

    this.games = this.gameService.getGames();
    //ovo radi, ali u htmlu se ne prikazuje string imena igre
  }

  onSelectedType(event: Event): void {
    this.review = (<HTMLSelectElement>event.target).value==="0";
    }
}
