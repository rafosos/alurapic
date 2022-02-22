import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Alert, AlertType } from "./alert";

@Injectable({ providedIn: 'root'})
export class AlertService{

    alertSubject: Subject<Alert> = new Subject<Alert>();
    dismissAlertAfterRedirecting = true;

    constructor(router: Router){ 
        router.events.subscribe(event=>{
            if(event instanceof NavigationStart){
                if(this.dismissAlertAfterRedirecting){ //se for true, o alert sai depois de redirecionar 
                    this.dismissAlertAfterRedirecting = false;
                }else{
                    this.clear()
                }
            }
        })
    }

    success(message:string, dismissAlertAfterRedirecting: boolean = false){
        this.alert(AlertType.SUCCESS, message, dismissAlertAfterRedirecting);
    }
    
    warning(message:string, dismissAlertAfterRedirecting: boolean = true){
        this.alert(AlertType.WARNING, message, dismissAlertAfterRedirecting);
    }

    danger(message:string, dismissAlertAfterRedirecting: boolean = true){
        this.alert(AlertType.DANGER, message, dismissAlertAfterRedirecting);
    }
    
    info(message:string, dismissAlertAfterRedirecting: boolean = true){
        this.alert(AlertType.INFO, message, dismissAlertAfterRedirecting);
    }
    
    private alert(alertType: AlertType, message: string, dismissAlertAfterRedirecting){
        this.dismissAlertAfterRedirecting = dismissAlertAfterRedirecting;
        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert(){
        return this.alertSubject.asObservable();
    }

    clear(){
        this.alertSubject.next(null);
    }
}