import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3";
  
  private key = "527fa03f4920b2dd83f17afdebe92743";

  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatesMovies(page: number = 1) {
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.key);
  }

  getMoviesDetails(id: any) {
    return this.http.get(this.baseApiPath + `/movie/${id}?api_key=` + this.key);
  }
}
