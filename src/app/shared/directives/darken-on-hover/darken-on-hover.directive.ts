import { Directive, ElementRef, HostListener, Input, Renderer, Renderer2 } from "@angular/core";

@Directive({
    selector: '[apDarkenOnHover]' //o uso do parenteses faz com que a diretiva possa entrar como atributo numa tag
})
export class DarkenOnHoverDirective{

    @Input() brightness:string = '70%';

    constructor(private el: ElementRef, private render: Renderer2){}

    @HostListener('mouseover')
    darkenOn(){
        this.render.setStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff(){
        this.render.setStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}