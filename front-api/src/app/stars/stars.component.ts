import {Component, Input, OnInit} from '@angular/core';
import {RecipeItem} from "../interface/recipe";

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  @Input() recipe?: RecipeItem;
  constructor() { }

  ngOnInit(): void {
  }

}
