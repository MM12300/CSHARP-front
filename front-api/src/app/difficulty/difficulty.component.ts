import {Component, Input, OnInit} from '@angular/core';
import {RecipeItem} from "../interface/recipe";

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss']
})
export class DifficultyComponent implements OnInit {

  @Input() recipe?: RecipeItem;
  constructor() { }

  ngOnInit(): void {
  }

}
