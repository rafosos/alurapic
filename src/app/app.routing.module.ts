import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PhotoFormComponent } from "./photos/photo-form/photo-form.component";
import { PhotoListComponent } from "./photos/photo-list/photo-list.component";
import { NotFoundComponent } from "./errors/not-found/not-found.component";
import { PhotoListResolver } from "./photos/photo-list/photo-list.resolver";
import { AuthGuard } from "./core/auth/auth.guard";
import { PhotoDetailsComponent } from "./photos/photo-details/photo-details.component";
import { GlobalErrorComponent } from "./errors/global-error/global-error.component";

const routes: Routes = [
    { 
        path: '', 
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { 
        path: 'home', 
        loadChildren: './home/home.module#HomeModule'
    },
    { 
        path: 'user/:userName', //userName é declarado e recebido
        component: PhotoListComponent, //componente que vai ser utilizado caso a rota seja a acima
        resolve:{ photos: PhotoListResolver }, //disponibiliza o resolver para o componente
        data: {
            title: "Timeline"
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [AuthGuard], //só entra logado
        data: {
            title: 'Upload photo'
        }
    },
    { 
        path: 'user/:userName/p/:photoId',
        component: PhotoDetailsComponent,
        data: {
            title: 'Photo details'
        }
    },
    { 
        path: 'error', 
        component: GlobalErrorComponent,
        data:{
            title: 'error'
        }
    },
    { 
        path: 'not-found', 
        component: NotFoundComponent,
        data:{
            title: 'Page not found'
        }
    },
    { 
        path: '**', 
        redirectTo: 'not-found'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true })], //pega o que o usuário digitou na url e direciona a route
    exports: [ RouterModule ]
})
export class AppRoutingModule{ }