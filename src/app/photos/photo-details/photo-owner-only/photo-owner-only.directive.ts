import { Directive, ElementRef, Input, OnInit, Renderer, Renderer2 } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";
import { Photo } from "../../photo/photo";

@Directive({
    selector: '[apPhotoOwnerOnlyDirective]'
})
export class PhotoOwnerOnlyDirective implements OnInit{

    @Input() ownedPhoto: Photo;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer2,
        private userService: UserService
        ) {}

    ngOnInit(): void {
        if(this.userService.isLogged()){
            this.userService
              .getUser()
              .subscribe(user =>{
                if(user.id != this.ownedPhoto.userId){
                    this.renderer.setStyle(this.element.nativeElement, 'display', 'none')
                }
            })
        } else{
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none')
        }
    }
}