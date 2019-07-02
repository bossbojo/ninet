import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValidationDirective } from './lib/validation/validation.directive';
import { NumberToThaiBahtPipe } from './lib/pipes/numbertothaibaht.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxBootstrapModule } from './lib/ngx-bootstrap/ngx-bootstrap.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        // components
        NavbarComponent,
        FooterComponent,

        // pipe and directive
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

        // components
        NavbarComponent,
        FooterComponent,

        // pipe and directive
        NumberToThaiBahtPipe,
        ValidationDirective
    ],
    providers: [],
})
export class ShareModule { }
