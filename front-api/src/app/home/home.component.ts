import { Component, OnInit } from '@angular/core';
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

  recipeForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.recipeForm = this.fb.group({
      name: '',
      description: '',
      urlPicture: '',
      ingredients: '',
      duration: '',
      score: '',
      budget: '',
      recipe: '',
      difficulty: '',
    })
  }

  ngOnInit(): void {
  }

  public addRecipe() {
    const recipeData = this.recipeForm.value;

    this.createRecipe(recipeData)
      .subscribe({
        next: recipe => {
          console.log(`recipe created`);
        },
        error: error => {
          //this.error = error;
        }
      });

    this.recipeForm.reset();
  }

  public createRecipe(recipeData: RecipeItem): Observable<RecipeItem> {
    return this.http
      .post<RecipeItem>(
        `https://recipebackend.azurewebsites.net/api/recipe`,
        recipeData,
      )
      .pipe(
        //catchError(error => this.handleError(error))
      );
  }




}
