import { Component, Input } from "@angular/core";

const CLOUD = 'http://localhost:3000/imgs/';

@Component({
    selector: 'ap-photo',
    templateUrl: './photo.component.html'
})
export class PhotoComponent {

    private _url = '';

    @Input() description = '';

    @Input() set url(url: string){ //setter para a inbound property
        if(!url.startsWith('data')){ //se começar com data, a img está codificada na base 64, e não precisa do caminho
            this._url = CLOUD + url;
        }else{
            this._url = url;
        }
    }

    get url(){ //se tem um setter e a propriedade precisa ser acessada mais tarde, precisa de um getter
        return this._url;
    }
}