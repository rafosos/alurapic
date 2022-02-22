import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Photo } from "../photo/photo";
import { PhotoService } from "../photo/photo.service";

@Injectable({ providedIn: 'root' })
export class PhotoListResolver implements Resolve<Observable<Photo[]>>{ 

    constructor (private service: PhotoService) { } //inicia e disponibiliza o PhotoService

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const userName = route.params.userName; //pega o username dos parâmetros da rota
        return this.service.listFromUserPaginated(userName, 1); //manda o username pro PhotoService e pega a lista de fotos retornada
    }

}