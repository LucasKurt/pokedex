import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  public allPokemons: any;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.findAll.subscribe((res) => {
      this.allPokemons = res.results;
    });
  }
}
