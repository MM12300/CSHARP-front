import { Component, OnInit } from '@angular/core';
import { RecipeItem} from "../interface/recipe";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  public recipes?:RecipeItem[];
  public recipeForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
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
    this.getRecipes().subscribe(recipes =>{
      this.recipes = recipes;
      console.log(this.recipes);
    })
  }

  public getRecipes(){
    return this.http.get<RecipeItem[]>("https://recipebackend.azurewebsites.net/api/recipe");
  }

  public deleteRecipe(id:number) {
    this.http.delete<RecipeItem>(`https://recipebackend.azurewebsites.net/api/recipe/${id}`).subscribe(()=>{
      this.getRecipes().subscribe(recipes => {
        this.recipes = recipes;
      })
    });
  }

  public createRecipe() {
    const recipeData = this.recipeForm.value;
    this.http
      .post<RecipeItem>(
        `https://recipebackend.azurewebsites.net/api/recipe`,
        recipeData,
      ).subscribe(
      ()=>{
        this.getRecipes().subscribe(recipes => {
          this.recipes = recipes;
        })
      }
    )

    this.recipeForm.reset();
  }
}
