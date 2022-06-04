import {Component, Input, OnInit} from '@angular/core';
import {RecipeItem} from "../interface/recipe";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  // UI guards
  @Input() public isButtonDisabled: boolean = true;
  @Input() public token:string = '';

  //All recipes
  public recipes?:RecipeItem[];

  //Forms
  public createRecipeForm: FormGroup;
  public editRecipeForm: FormGroup = this.fb.group({
    name: '',
    description: '',
    urlPicture: '',
    ingredients: '',
    duration: '',
    score: '',
    budget: '',
    recipe: '',
    difficulty: '',
  });

  public recipeToEdit: any ;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    // Create Recipe Form Initialization
    this.createRecipeForm = this.fb.group({
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

  //Page loading
  ngOnInit(): void {
    //Fetch all Recipes
    this.getRecipes().subscribe(recipes =>{
      this.recipes = recipes;
    });
    //Fetch the second Recipe to Edit
    this.getRecipe(2).subscribe(recipe=>{
      this.recipeToEdit = recipe
      this.editRecipeForm = this.fb.group({
        id: this.recipeToEdit.id,
        name: this.recipeToEdit.name,
        description: this.recipeToEdit.description,
        urlPicture: this.recipeToEdit.urlPicture,
        ingredients: this.recipeToEdit.ingredients,
        duration: this.recipeToEdit.duration,
        score: this.recipeToEdit.score,
        budget: this.recipeToEdit.budget,
        recipe: this.recipeToEdit.recipe,
        difficulty: this.recipeToEdit.difficulty,
      })
    })
  }

  public makeHttpRequestHeader(token:string){
    return {
      headers: new HttpHeaders()
        .set('Authorization', token)
    };
  }

  public getRecipes(){
    return this.http.get<RecipeItem[]>("https://recipebackend.azurewebsites.net/api/recipe");
  }

  public getRecipe(id:number){
    return this.http.get<RecipeItem>(`https://recipebackend.azurewebsites.net/api/recipe/${id}`);
  }

  public editRecipe(id:number){
    const recipeData = this.editRecipeForm.value;
    return this.http.put<RecipeItem>(`https://recipebackend.azurewebsites.net/api/recipe/${id}`, recipeData, this.makeHttpRequestHeader(this.token)).subscribe(()=>{
      this.getRecipe(this.recipeToEdit.id).subscribe(recipe => {
        //Refresh Recipe to Edit and recipe to edit form
        this.recipeToEdit = recipe;
        this.editRecipeForm = this.fb.group({
          id: this.recipeToEdit.id,
          name: this.recipeToEdit.name,
          description: this.recipeToEdit.description,
          urlPicture: this.recipeToEdit.urlPicture,
          ingredients: this.recipeToEdit.ingredients,
          duration: this.recipeToEdit.duration,
          score: this.recipeToEdit.score,
          budget: this.recipeToEdit.budget,
          recipe: this.recipeToEdit.recipe,
          difficulty: this.recipeToEdit.difficulty,
        })
      })
      //Refresh list of recipes for table
      this.getRecipes().subscribe(recipes =>{
        this.recipes = recipes;
      });
    });
  }

  public deleteRecipe(id:number) {
    this.http.delete<RecipeItem>(`https://recipebackend.azurewebsites.net/api/recipe/${id}`, this.makeHttpRequestHeader(this.token)).subscribe(()=>{
      this.getRecipes().subscribe(recipes => {
        this.recipes = recipes;
      })
    });
  }

  public createRecipe() {
    const recipeData = this.createRecipeForm.value;
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
    this.createRecipeForm.reset();
  }
}
