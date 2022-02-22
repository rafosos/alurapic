import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ShowIfNotLoggedDirective } from "./show-if-not-logged.directive";

@NgModule({
    declarations: [ShowIfNotLoggedDirective],
    imports: [CommonModule],
    exports: [ShowIfNotLoggedDirective]
})
export class ShowIfNotLoggedModule{

}