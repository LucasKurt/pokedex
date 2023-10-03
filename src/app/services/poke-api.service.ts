import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';

  constructor(private http: HttpClient) {}

  get findAll(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      // tap((res) => res),
      tap((res) => {
        res.results.map((pokemon: any) => {
          this.getPokemonByUrl(pokemon.url).subscribe((res) => pokemon.status = res);
        });
      })
    );
  }

  public getPokemonByUrl(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map((res) => res));
  }
}
