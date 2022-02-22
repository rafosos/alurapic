import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root'})
export class PlatformDetectorService{

    constructor(@Inject(PLATFORM_ID) private platformId: string){ } //injeta o token da plataforma na var

    isPlatformBrowser(){
        return isPlatformBrowser(this.platformId);
    }
}