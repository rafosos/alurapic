import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AlertModule } from "../shared/components/alert/alert.module";
import { LoadingModule } from "../shared/components/loading/loading.module";
import { MenuModule } from "../shared/components/menu/menu.module";
import { ShowIfLoggedModule } from "../shared/directives/show-if-logged/show-if-logged.module";
import { ShowIfNotLoggedModule } from "../shared/directives/show-if-not-logged/show-if-not-logged.module";
import { RequestInterceptor } from "./auth/request.interceptor";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
    declarations:[
        HeaderComponent,
        FooterComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        AlertModule,
        LoadingModule,
        MenuModule,
        ShowIfLoggedModule,
        ShowIfNotLoggedModule
    ],
    exports:[
        HeaderComponent,
        FooterComponent
    ],
    providers:[
        {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true
        }
    ]
})
export class CoreModule{}