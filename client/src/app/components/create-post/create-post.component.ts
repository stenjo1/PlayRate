import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostType } from 'src/app/models/post.model';
// trebace mi game service da dohvatim listu igrica i ucitam ih u dropdown u formularu
// i da mi da gameId za odabranu igricu iz dropdowna

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  review: boolean = false;
  createPostForm: FormGroup;

  constructor( private formBuilder: FormBuilder){
    this.createPostForm = this.formBuilder.group({
      game: ['', [Validators.required]],
      type: ['', [Validators.required]],
      reviewScore: ['', [Validators.min(1.0), Validators.max(10.0)]],
      reviewText: ['', []]
    }

    );
  }


  onSelectedType(event: Event): void {
    this.review = (<HTMLSelectElement>event.target).value==="0";
    }
}
