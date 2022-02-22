import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { AlertService } from "src/app/shared/components/alert/alert.service";
import { UserService } from "../user/user.service";

//se estiver logado, o acesso é bloqueado e redireciona para o dashboard do usuário

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate{

    constructor(
        private userService: UserService,
        private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) : boolean | Observable<boolean> | Promise<boolean> {
        
            if(this.userService.isLogged()){
                this.router.navigate(['user', this.userService.getUserName()]);
                return false;
            }
            return true;
    }
}