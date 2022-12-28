import { Component, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Post } from "../../models/post.model"

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnDestroy{
  @Input()
  public review: Post | undefined;  // povezati ovo polje sa profile-page html i onda obrisati undefined i upitnike u ovom htmlu
  editReviewForm: FormGroup;
  private activeSubscriptions: Subscription[] = [];

  public constructor(private postService: PostsService, private formBuilder: FormBuilder) {
    this.editReviewForm = this.formBuilder.group({
      reviewScore: ['', [Validators.min(1.0), Validators.max(10.0)]],
      reviewText: ['', []]
    });

  }
  ngOnDestroy(): void {
    this.activeSubscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
   
  // metod koji se poziva kad se klikne Save dugme
  onSave() {
    const reviewText =  this.editReviewForm.get("reviewText")?.value;
    const reviewScore =  this.editReviewForm.get("reviewScore")?.value;
    const postSub = this.postService.editReview("", reviewText, reviewScore).subscribe();
                                                // staviti this.review._id
    this.activeSubscriptions.push(postSub);
  }
  
}
