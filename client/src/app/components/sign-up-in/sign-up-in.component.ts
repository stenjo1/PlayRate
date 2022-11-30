import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sign-up-in',
  templateUrl: './sign-up-in.component.html',
  styleUrls: ['./sign-up-in.component.css']
})
export class SignUpInComponent{

  user: User;
  displayLogin: boolean = true;
  signForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.user = new User("","","");
    
    this.signForm = this.formBuilder.group({
        username: ['',[Validators.required]],
        email: ['',[Validators.required]],
        password: ['',[Validators.required]],
        passwordRe: ['',[Validators.required]]

    });

  }

  onSignUp(){
    this.displayLogin = true;
  }

  onLogIn(){
    this.displayLogin = false;
  }

  usernameHasErrors(): boolean{

    const errors: ValidationErrors | null | undefined = this.signForm.get('username')?.errors;

    return errors !== null;
  }

  emailHasErrors(): boolean{
    const errors: ValidationErrors | null | undefined = this.signForm.get('email')?.errors;

    return errors !== null;
  }

  passwordHasErrors(): boolean{
    const errors: ValidationErrors | null | undefined = this.signForm.get('password')?.errors;

    return errors !== null;
  }

  passwordReHasErrors(): boolean{
    const errors: ValidationErrors | null | undefined = this.signForm.get('passwordRe')?.errors;

    return errors !== null;
  }

  nameErrors(): string[] {

    const errors: ValidationErrors | null | undefined = this.signForm.get('username')?.errors;

    if (errors == null) {
      return [];
    }  

    const errorMsgs: string[] = [];
    
    if (errors['required']) {
      errorMsgs.push('This field is required');
    }

    if (errors['minlength']) {
      errorMsgs.push("Username min length is 10");
    }

    return errorMsgs;
  }

  onSignUpSubmit() {
    if(this.signForm.invalid){
      window.alert("Some fields do not have valid values")
      return;
    }

    return;
  }

}
