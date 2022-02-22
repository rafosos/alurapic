import { NgModule } from '@angular/core';

import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoService } from './photo/photo.service';
import { PhotoDetailsModule } from './photo-details/photo-details.module';

@NgModule({
    imports:[
        PhotoModule,
        PhotoFormModule,
        PhotoListModule,
        PhotoDetailsModule
    ],
    providers:[PhotoService]
})
export class PhotosModule{ }