import { Component } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";

@Component({
    selector: 'ap-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent{

    constructor(private router: Router){}

    isShown = false;

    toggle(){
        this.isShown = !this.isShown;
        this.router.events.subscribe(event=>{ //subscribe identifica se um evento aconteceu
            if(event instanceof NavigationStart){ //se o evento que aconteceu foi uma redirecionada, o código executa
                this.isShown = false;
            }})
    }
}