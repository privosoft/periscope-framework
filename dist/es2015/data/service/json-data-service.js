var _dec, _dec2, _class;

import { DataService } from './data-service';
import { inject, transient } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

export let JsonDataService = (_dec = transient(), _dec2 = inject(HttpClient), _dec(_class = _dec2(_class = class JsonDataService extends DataService {
    constructor(http) {
        super();
        http.configure(config => {
            config.useStandardConfiguration();
        });
        this._http = http;
    }

    read(options) {
        var url = this.url + (this.queryMapper ? this.queryMapper(options) : "");
        return this._http.fetch(this.url).then(response => {
            return response.json();
        }).then(jsonData => {
            return {
                data: this.dataMapper ? this.dataMapper(jsonData) : jsonData,
                total: this.totalMapper ? this.totalMapper(jsonData) : jsonData.length
            };
        });
    }
}) || _class) || _class);