import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

import { UserService } from "src/app/core/user/user.service";
import { AlertService } from "src/app/shared/components/alert/alert.service";
import { Photo } from "../photo/photo";
import { PhotoService } from "../photo/photo.service";

@Component({
    templateUrl: './photo-details.component.html',
    styleUrls: ['./photo-details.css']
})
export class PhotoDetailsComponent implements OnInit{

    photo$: Observable<Photo[]>;
    photoId: number; 

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private titleService: Title
        ) {}
    
    ngOnInit(): void {
        this.titleService.setTitle(this.route.snapshot.params.userName + '\'s photo details | Alurapic')
        this.photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(this.photoId);
        this.photo$.subscribe(() => {}, err =>{
            this.router.navigate(['not-found'])
        })
    }

    delete(){
        this.photoService.deletePhoto(this.photoId)
            .subscribe(() => {
                this.alertService.success('Foto removida com sucesso!', true);
                this.router.navigate(['/user', this.userService.getUserName()], {replaceUrl: true})},
                err => {
                    console.log(err);
                    this.alertService.warning("Erro: foto não deletada.");
                });
    }

    like(photoId: number){
        this.photoService.like(photoId)
            .subscribe(errCod =>{
                if(errCod == true){
                    this.photo$ = this.photoService.findById(photoId);
                }else if(errCod == '401'){
                    this.alertService.danger("You must be logged in to add likes.", false);
                }
            })
    }
}