import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() loginEvent = new EventEmitter<string>();
  @Output() tokenEvent = new EventEmitter<string>();
  public loginForm: FormGroup;
  public jwt: string = '';
  public button:boolean = true;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: 'jason_admin',
      password: 'MyPass_w0rd'
    })
    this.loginForm.controls['username'].disable();
    this.loginForm.controls['password'].disable();
  }

  ngOnInit(): void {
  }

  public login() {
    this.loginEvent.emit('userLoggedIn');
    const recipeData = this.loginForm.value;
    this.http
      .post(
        `https://recipebackend.azurewebsites.net/api/login`,
        recipeData,
        {responseType: 'text'}
      ).subscribe(
      (response) => {
        this.loginEvent.emit('userLoggedIn');
        this.jwt = 'bearer ' + response;
        this.tokenEvent.emit(this.jwt);
        this.button = false;
      }
    )
  }

}
