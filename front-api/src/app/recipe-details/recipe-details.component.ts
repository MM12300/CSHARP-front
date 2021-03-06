import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeItem} from "../interface/recipe";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  public recipe?:RecipeItem


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    const id = this.route.snapshot.paramMap.get('id');
    // TODO : Gérer le cas où l'id existe pas.
    if(id !== null){
      this.getRecipe(id).subscribe(recipe=>{
          this.recipe = recipe
        }
      )
    }
  }


  ngOnInit(): void {

  }

  public getRecipe(id : string){
    return this.http.get<RecipeItem>(`https://recipebackend.azurewebsites.net/api/recipe/${id}`);
  }
}
