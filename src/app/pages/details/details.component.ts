import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public pokemon: any;
  private pokemonUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private pokemonSpeciesUrl: string =
    'https://pokeapi.co/api/v2/pokemon-species/';

  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.getPokemonByUrl(this.pokemonUrl + id);
    const species = this.pokeApiService.getPokemonByUrl(
      this.pokemonSpeciesUrl + id
    );

    return forkJoin([pokemon, species]).subscribe({
      next: (res) => {
        this.pokemon = res;
        this.isLoading = true;
      },
      error: () => {
        this.apiError = true;
      },
    });
  }
}
