import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Photo } from './photo';
import { PhotoComments } from './photo-comments';

const API_URL = environment.ApiUrl;

@Injectable()
export class PhotoService {

    constructor(private http: HttpClient){}

    listFromUser(userName: string){ //recebe como parâmetro o username
        return this.http
            .get<Photo[]>(API_URL + `/${userName}/photos`); //busca as fotos do servidor utilizando o username e retorna um observable
    }

    findById(photoId: number){ //recebe como parâmetro o username
        return this.http.get<Photo[]>(API_URL + `/photos/${photoId}`); //busca as fotos do servidor utilizando o username e retorna um observable
    }

    listFromUserPaginated(userName: string, page: number){
        const params = new HttpParams().append('page', page.toString()); //parâmetro ?page=1 para url
        
        return this.http
            .get<Photo[]>(API_URL + `/${userName}/photos`, {params}); //busca as fotos do servidor utilizando o username e retorna um observable, + parâmetro ?page=1
    }

    upload(description: string, allowComments: boolean, image: File){

        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', image);

        return this.http
                .post(
                    API_URL + '/photos/upload', 
                    formData,
                    {
                        observe: 'events',
                        reportProgress: true
                    } );
    }

    getComments(photoId: number){
        return this.http.get<PhotoComments[]>(API_URL + `/photos/${photoId}/comments`)
    }

    addComment(photoId: number, commentText: string) {
        return this.http.post(
            API_URL + '/photos/' + photoId + '/comments/',
            {commentText}
        );    
    }
    
    deletePhoto(photoId: number){
        return this.http.delete(API_URL + '/photos/'+ photoId);
    }

    like(photoId: number){
        return this.http.post(API_URL + `/photos/${photoId}/like`, {} , { observe: 'response'})
            .pipe(map(res => true))
            .pipe(catchError(err => {
                 if(err.status == '304'){
                     return of(false)
                  }else if (err.status == '401'){
                      return of(err.status)
                  } else{
                      throwError(err);
                  }
            }));
    }
}