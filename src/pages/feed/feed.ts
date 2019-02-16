import { FilmeDetalhesPage } from './../filme-detalhes/filme-detalhes';
import { MoovieProvider } from './../../providers/moovie/moovie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public objeto_feed: any = {
    titulo: "Odair Viol",
    data: "Fevereiro, 08, 2019",
    descricao: "Estou criando meu primeiro app",
    qntd_like: 12,
    qntd_comments: 4,
    time_comments: "11th Fev"
  }

  public nomeUsuario = "Odair Usuário";
  public lista_filmes = new Array<any>();

  loader: any;
  refresher: any;
  isRefreshing: boolean = false;
  page: number = 1;
  infinitScroll: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  carregarFilmes(newPage: boolean = false) {
    this.abrirLoader();
    this.movieProvider.getLatesMovies(this.page).subscribe(rest => {
      const response = (rest as any);
      const objeto_retorno = JSON.parse(response._body);

      if (newPage) {
        console.log(newPage, this.page)
        this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
        console.log(this.lista_filmes);
        this.infinitScroll.complete();
      } else {
        this.lista_filmes = objeto_retorno.results;
      }

      this.fecharLoader();

      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }

    }, error => {
      console.log(error);
      this.fecharLoader();
      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }
    });
  }

  doRefresh(refresher: any) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  abrirLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Carregando filmes...'
    });

    this.loader.present();
  }

  fecharLoader() {
    this.loader.dismiss();
  }

  abrirDetalhes(filme: any) {
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll: any) {
    this.page++;
    this.infinitScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  somaDoisNumeros(num1: number, num2: number) {
    //alert(num1 + num2);
  }
}
