import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function compareToValidator(value: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        return value !== '' && control.value !== value ? {'compareTo': control.value} : null;
    };
}

@Directive({
    selector: '[passwordMatch]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => PasswordMatchValidator),
        multi: true
    }],
    host: {'[attr.passwordMatch]': 'passwordMatch ? passwordMatch : null'}
})
export class PasswordMatchValidator implements Validator, OnChanges {
    @Input() passwordMatch: string;
    private _validator: ValidatorFn;
    private _onChange: () => void;

    ngOnChanges(changes: SimpleChanges): void {
        if ('passwordMatch' in changes) {
            this._createValidator();
            if (this._onChange) {
                this._onChange();
            }
        }
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this._validator(c);
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    private _createValidator(): void {
        this._validator = compareToValidator(this.passwordMatch);
    }

}
