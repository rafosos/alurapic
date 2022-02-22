import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginGuard } from "../core/auth/login.guard";
import { HomeComponent } from "./home.component";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";

const routes: Routes = [ 
    {
        path: '', 
        component: HomeComponent,
        canActivate: [LoginGuard], //só entra sem estar logado
        children:[
               { 
                  path: '', 
                  component: SignInComponent,
                  data: {
                      title: 'Sign In'
                  }
               },
               { 
                  path: 'signup', 
                  component: SignUpComponent,
                  data: {
                      title: 'Sign Up'
                  } 
               }
            ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes) //todo lazy loading module usa forChild, forRoot é só o pai
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule{

}