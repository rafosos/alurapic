import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})

export class PhotoListComponent implements OnInit {
  
  photos: Photo[] = []; //inicialização da propriedade da lista de fotos para ser exibida
  filter: string = ''; //filter que vai ser usado para receber o input search digitado pelo usuário
  userName: string = '';
  currentPage: number = 1;
  hasMore: boolean = true; //inicia o botão como verdadeiro para exibir ele na tela

  constructor(private activatedRoute: ActivatedRoute, 
              private photoService: PhotoService) {  }
  
  ngOnInit(): void{
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data.photos; //acessa o valor do resolver pelo routing module (.photos)
    });
  }
  
  load(){
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos =>{
        this.filter= '';
        this.photos = this.photos.concat(photos); //adiciona as fotos novas da segunda página
        if(!photos.length) this.hasMore = false; //esconde o botão para aparecer o no more content
      })
  }
}
