import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AlertService } from "src/app/shared/components/alert/alert.service";
import { UserService } from "../user/user.service";

//se não estiver logado, o acesso é bloqueado e redireciona para a página de login

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{ 

    constructor(
        private userService: UserService,
        private router: Router,
        private alertService: AlertService){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) : boolean | Observable<boolean> | Promise<boolean> {
        
            if(!this.userService.isLogged()){
                this.router.navigate([''],
                {
                    queryParams: {
                        fromUrl: state.url
                    }
                });
                
                return false;
            }
            return true;
    }
}