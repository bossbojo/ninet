import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ValidationRule {
    /**
     * The control value must be number.
     * @param control Form control instance.
     */
    static numeric(control: AbstractControl) {
        return isNaN(control.value) ? { numeric: true } : null;
    }

    /**
     * The control value must be a number that is zero or above.
     * @param control Form control instance.
     */
    static numericZeroOrAbove(control: AbstractControl) {
        return isNaN(control.value) ? { numeric: true } :
            +control.value < 0 ? { zeroOrAbove: true } : null;
    }

    /**
     * The control value must be email.
     * @param control Form control instance.
     */
    static email(control: AbstractControl) {
        // tslint:disable-next-line:max-line-length
        const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !EMAIL_REGEXP.test(control.value) ? { email: true } : null;
    }

    /**
     * The control value must not contain any special character.
     * @param control Form control instance.
     */
    static noSpecial(control: AbstractControl) {
        const REGEXP = /^((?![!#$%&'*+\/=?^_`{|}~.]).)*$/i;
        return !REGEXP.test(control.value) ? { special: true } : null;
    }

    /**
     * The control value must not contain any special character.
     * @param control Form control instance.
     */
    static noBeforeAfterWhiteSpace(control: AbstractControl) {
        if (control.value === null) {
            return null;
        }

        if (control.value.length === 0) {
            return null;
        }

        const regex = /^[^\s]+(\s+[^\s]+)*$/;
        return !regex.test(control.value) ? { nowhitespace: true } : null;
    }

    /**
     * The control value must contain only English characters (without special character).
     * @param control Form control instance.
     */
    static engOnly(control: AbstractControl) {
        const regex = /^[A-Za-z0-9\s]+$/;
        return !regex.test(control.value) ? { engonly: true } : null;
    }

    /**
     * The control value must contain only English characters (with special character).
     * @param control Form control instance.
     */
    static engWithSpecialOnly(control: AbstractControl) {
        const regex = /^[A-Za-z0-9!#$%&'*+\/=?^_`{|}~.-]+$/;
        return !regex.test(control.value) ? { engwithspecialonly: true } : null;
    }

    /**
     * The control value must be in money format.
     * @param control Form control instance.
     */
    static money(control: AbstractControl) {
        const regex = /^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/;
        return !regex.test(control.value) ? { money: true } : null;
    }

    static same(controlName: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (!control.parent) { return null; }

            const targetControl = control.parent.get(controlName);

            if (!targetControl) {
                return null;
            }

            return control.value !== targetControl.value ? { same: true } : null;
        };
    }
}
