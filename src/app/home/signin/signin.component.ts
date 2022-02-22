import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "src/app/core/auth/auth.service";
import { PlatformDetectorService } from "src/app/core/platform-detector/platform-detector.service";

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{

    fromUrl: string;
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute
        ) {}

    ngOnInit(): void {
      //  this.titleService.setTitle('Login | Alurapic'); //muda o título
        this.activatedRoute.queryParams //pea as informações da rota colocada pelo queryParams na url
            .subscribe(params => this.fromUrl = params['fromUrl']); //se tiver alguma coisa de fromUrl, coloca em this.fromUrl
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.platformDetectorService.isPlatformBrowser() &&
        this.userNameInput.nativeElement.focus();
    }

    login(){
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;
        
        this.authService
              .authenticate(userName, password)
              .subscribe(()=> this.fromUrl ? this.router.navigateByUrl(this.fromUrl) : this.router.navigate(['user', userName]),
              err =>{
                  console.log(err);
                  this.loginForm.reset();
                  this.platformDetectorService.isPlatformBrowser() && //se o código está rodando no server, o próx cod n será executado
                     this.userNameInput.nativeElement.focus();
                  alert('Invalid user name and/or password.');
              });

    }
}