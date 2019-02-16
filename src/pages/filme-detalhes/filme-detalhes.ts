import { MoovieProvider } from './../../providers/moovie/moovie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [
    MoovieProvider
  ]
})
export class FilmeDetalhesPage {

  filme: any;
  filmeId: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MoovieProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilmeDetalhesPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FilmeDetalhesPage');
    this.filmeId = this.navParams.get('id');
    console.log(this.filmeId);
    this.movieProvider.getMoviesDetails(this.filmeId).subscribe(data => {
      let retorno = (data as any)._body;
      this.filme = JSON.parse(retorno);
    }, error => {
      console.log(error);
    });
  }

}
