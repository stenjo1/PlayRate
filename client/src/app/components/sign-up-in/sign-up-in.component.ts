import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';

import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-sign-up-in',
  templateUrl: './sign-up-in.component.html',
  styleUrls: ['./sign-up-in.component.css']
})

export class SignUpInComponent implements OnDestroy{

  user: User;
  displayLogin: boolean = true;
  signForm: FormGroup;
  failedLogin: boolean;
  userSub: Subscription = new Subscription();
 
  constructor(private formBuilder: FormBuilder,private auth: AuthService){
    this.user = new User("","","","");
    this.failedLogin = false;
 
    this.signForm = this.formBuilder.group({
        username: ['',[Validators.required,Validators.minLength(2)]],
        email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" )]],
        password: ['',[Validators.required,Validators.minLength(8)]],
    });

  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onSignUp(){
    this.displayLogin = true;
    this.signForm.reset({username: '',email: '',password: ''})
    this.failedLogin=false;
  }

  onLogIn(){
    this.displayLogin = false;
    this.signForm.reset({username: '',email: '',password: ''})
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

  usernameErrors(): string[] {

    const errors: ValidationErrors | null | undefined = this.signForm.get('username')?.errors;

    if (errors == null) {
      return [];
    }  

    const errorMsgs: string[] = [];
    
    if (errors['required'] ) {
      errorMsgs.push('This field is required!');
    }

    if (errors['minlength']){
      errorMsgs.push("Username has to have more than 2 characters!")
    }


    return errorMsgs;
  }

  emailErrors(): string[] {

    const errors: ValidationErrors | null | undefined = this.signForm.get('email')?.errors;

    if (errors == null) {
      return [];
    }  

    const errorMsgs: string[] = [];
    
    if (errors['required'] ) {
      errorMsgs.push('This field is required!');
    }

    if(errors["pattern"]){
      errorMsgs.push("Email adress is invalid!")
    }

    return errorMsgs;
  }

  passwordErrors(): string[] {

    const errors: ValidationErrors | null | undefined = this.signForm.get('password')?.errors;

    if (errors == null) {
      return [];
    }  

    const errorMsgs: string[] = [];
    
    if (errors['required']) {
      errorMsgs.push('This field is required!');
    }

    if (errors['minlength']) {
      errorMsgs.push("Password min length is 8 characters!");
    }


    return errorMsgs;
  }

  onSignUpSubmit() {

    if(!this.signForm.invalid){
      console.log("Prosao je Sign up!")
      this.register();
      this.signForm.reset({username: '',email: '',password: ''});
      this.displayLogin = true;
      return;
    }

    if(this.signForm.get("password")?.valid && this.signForm.get("email")?.valid){
      console.log("Prosao sign in")
      this.login();
      this.signForm.reset({username: '',email: '',password: ''});
      this.failedLogin=false;
    }
    else{
      if(this.displayLogin)
        this.failedLogin=true;
    }
    
    return;
  }

  register(): void {
      const data = this.signForm.value;
      const obs: Observable<User | null> = this.auth.register(data.username, data.password, data.email);

      console.log(obs);
      this.userSub = obs.subscribe((user: User | null) => {
        console.log(user)
      });
  }

  login(): void {
    const data = this.signForm.value;
    
    const obs: Observable<User | null> = this.auth.login(data.email,data.password);
    
    this.userSub = obs.subscribe((user: User | null) => {
      console.log(user)
    });
  }
}
