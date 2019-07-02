import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValidationDirective } from './lib/validation/validation.directive';
import { NumberToThaiBahtPipe } from './lib/pipes/numbertothaibaht.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxBootstrapModule } from './lib/ngx-bootstrap/ngx-bootstrap.module';

@NgModule({
    declarations: [
        NumberToThaiBahtPipe,
        ValidationDirective,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxBootstrapModule
    ],
    exports: [
        // module
        FormsModule,
        ReactiveFormsModule,
        NgxBootstrapModule,

        // pipe and directive
        NumberToThaiBahtPipe,
        ValidationDirective
    ],
    providers: [],
})
export class ShareModule { }
