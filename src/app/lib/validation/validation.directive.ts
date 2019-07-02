import { Directive, ElementRef, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidationText } from './validation.text';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[Validation]'
})
export class ValidationDirective implements AfterViewInit {
    helpTextEl: any;

    constructor(private el: ElementRef, private control: NgControl, private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        this.helpTextEl = this.el.nativeElement.parentElement.querySelector('.validation-text');

        // Go up another level
        if (!this.helpTextEl) {
            this.helpTextEl = this.el.nativeElement.parentElement.parentElement.querySelector('.validation-text');
        }
    }

    /**
     * Check if control is valid and add appropriate class and text to elements.
     */
    @HostListener('blur')
    @HostListener('input')
    @HostListener('onSelect') // For PrimeNg's calendar
    @HostListener('onChange') // For PrimeNg's dropdown
    checkValidation() {
        this.resetElement();

        if (!this.control.control.valid) {
            this.renderer.addClass(this.el.nativeElement, 'is-invalid');

            if (this.helpTextEl) {
                if (Object.keys(this.control.control.errors)[0] === 'Mask error') {
                    this.control.control.setErrors(null);
                    return this.checkValidation();
                }

                const errorText = ValidationText[Object.keys(this.control.control.errors)[0]];

                this.helpTextEl.innerHTML = errorText;
                this.renderer.addClass(this.helpTextEl, 'text-red');
            }
        }

        if (this.control.control.valid) {
            this.renderer.addClass(this.el.nativeElement, 'is-valid');
        }
    }

    /**
     * Reset all element to their initial state
     */
    private resetElement(): void {
        this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
        this.renderer.removeClass(this.el.nativeElement, 'is-valid');

        if (this.helpTextEl) {
            this.renderer.removeClass(this.helpTextEl, 'text-danger');
            this.helpTextEl.innerHTML = '';
        }
    }
}
