import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { AlertService } from "src/app/shared/components/alert/alert.service";
import { PhotoComments } from "../../photo/photo-comments";
import { PhotoService } from "../../photo/photo.service";

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.css'] 
})
export class PhotoCommentsComponent implements OnInit{

    comments$: Observable<PhotoComments[]>;
    commentsForm: FormGroup;
    @Input() photoId: number; //inbound property para pegar o photoId do componente pai - photo-details.component

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder,
        private alertService: AlertService ) {}

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentsForm = this.formBuilder.group({
            newComment: ['', [Validators.maxLength(300), Validators.required]]
       })
    }

    addComment() { //save()
        const comment = this.commentsForm.get('newComment').value as string;
        this.comments$ = this.photoService.addComment(this.photoId, comment)
        .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
        .pipe(tap(() =>
            {
                this.alertService.success("Comment added! Glad you shared your opinion... or not.", true)
                this.commentsForm.reset();
            }));
    }

}