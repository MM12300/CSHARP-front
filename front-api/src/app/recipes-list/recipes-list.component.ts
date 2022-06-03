import {Component, Input, OnInit} from '@angular/core';
import {RecipeItem} from "../interface/recipe";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  @Input() public isButtonDisabled: boolean = true;
  @Input() public token:string = '';

  public recipes?:RecipeItem[];
  public recipeForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, public _apiService : ApiService) {
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
    });
  }

  public makeHttpRequestHeader(token:string){
    return {
      headers: new HttpHeaders()
        .set('Authorization', token)
    };
  }

  public getRecipes(){
    return this._apiService.getRecipes(this.token);
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
        this.makeHttpRequestHeader(this.token)
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
