import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RecipeItem} from "../interface/recipe";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  disableForm: boolean = true;
  jwt: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
  }


  public userLogged(log: string) {
    if (log === 'userLoggedIn') {
      this.disableForm = false;
    }
  }

  public token(token: string) {
    this.jwt = token;
  }


}
