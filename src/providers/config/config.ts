import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

let config_key_name = "config";

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {


    private config = {
        showSlide: false,
        name: "",
        userName: ""
    }

    constructor() {
    }

    getConfigData() {
        return localStorage.getItem(config_key_name);
    }

    setConfigData(showSlide?: boolean, name?: string, userName?: string) {
        let config = {
            showSlide: false,
            name: "",
            userName: ""
        }

        if (showSlide) {
            config.showSlide = showSlide;
        }
        if (name) {
            config.name = name;
        }
        if (userName) {
            config.userName = userName;
        }
        localStorage.setItem(config_key_name, JSON.stringify(config));
    }
}
