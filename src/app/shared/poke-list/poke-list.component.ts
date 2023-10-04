import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  private allPokemons: any;
  public filteredPokemons: any;
  public apiError: boolean = false;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.findAll.subscribe({
      next: (res) => {
        this.allPokemons = res.results;
        this.filteredPokemons = this.allPokemons;
      },
      error: () => {
        this.apiError = true;
      },
    });
  }

  public getSearch(value: string) {
    const filter = this.allPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.filteredPokemons = filter;
  }
}

// Busca pelo inicio de uma palavra
// const filter = this.allPokemons.filter((res: any) => {
//   return !res.name.indexOf(value.toLowerCase());
// });

// Busca pelo meio de uma palavra
// const filter = this.allPokemons.filter((res: any) => {
//   return res.name.includes(value.toLowerCase());
// });
