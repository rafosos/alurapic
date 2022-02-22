import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    @Output() onTyping = new EventEmitter<string>(); //criação do evento onTyping
    @Input() value ='';
    debounce: Subject<string> = new Subject<string>();
    filter: string = '';
    
    ngOnInit(){
        this.debounce
        .pipe(debounceTime(300))
        .subscribe(filter => this.onTyping.emit(filter)); //a cada vez que o evento for disparado, ele vai passar o valor de filter como $event
    }

    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }
}