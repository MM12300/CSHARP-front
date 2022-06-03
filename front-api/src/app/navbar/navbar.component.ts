import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RecipeItem} from "../interface/recipe";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() loginEvent = new EventEmitter<string>();
  public loginForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      login:'jason.admin@email.com',
      password:'MyPass_w0rd'
    })
    this.loginForm.controls['login'].disable();
    this.loginForm.controls['password'].disable();
  }

  ngOnInit(): void {
  }

  public login(){
    this.loginEvent.emit('userLoggedIn');
    const recipeData = this.loginForm.value;
    this.http
      .post<{ login:string, password: string }>(
        `https://recipebackend.azurewebsites.net/api/login`,
        recipeData,
      ).subscribe(
      ()=>{
        this.loginEvent.emit('userLoggedIn');
      }
    )
  }

}
