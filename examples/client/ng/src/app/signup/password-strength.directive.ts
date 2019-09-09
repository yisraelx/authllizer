import * as angular from 'angular';
import { IAttributes, IAugmentedJQuery, INgModelController, IScope } from 'angular';
import { Directive } from 'angular-ts-decorators';

function link(scope: IScope, element: IAugmentedJQuery, attrs: IAttributes, ngModel: INgModelController) {
    let indicator = element.children();
    let dots = Array.prototype.slice.call(indicator.children());
    let weakest = dots.slice(-1)[0];
    let weak = dots.slice(-2);
    let strong = dots.slice(-3);
    let strongest = dots.slice(-4);

    element.after(indicator);

    element
        .bind('keyup', () => {
            let matches: any = {
                    positive: {},
                    negative: {}
                },
                counts: any = {
                    positive: {},
                    negative: {}
                },
                tmp,
                strength = 0;

            angular
                .forEach(dots, (el) => {
                    el.style.backgroundColor = '#ebeef1';
                });

            if (ngModel.$viewValue) {
                // Increase strength level
                matches.positive.lower = ngModel.$viewValue.match(/[a-z]/g);
                matches.positive.upper = ngModel.$viewValue.match(/[A-Z]/g);
                matches.positive.numbers = ngModel.$viewValue.match(/\d/g);
                matches.positive.symbols = ngModel.$viewValue.match(/[$-/:-?{-~!^_`\[\]]/g);
                matches.positive.middleNumber = ngModel.$viewValue.slice(1, -1).match(/\d/g);
                matches.positive.middleSymbol = ngModel.$viewValue.slice(1, -1).match(/[$-/:-?{-~!^_`\[\]]/g);

                counts.positive.lower = matches.positive.lower ? matches.positive.lower.length : 0;
                counts.positive.upper = matches.positive.upper ? matches.positive.upper.length : 0;
                counts.positive.numbers = matches.positive.numbers ? matches.positive.numbers.length : 0;
                counts.positive.symbols = matches.positive.symbols ? matches.positive.symbols.length : 0;

                counts.positive.numChars = ngModel.$viewValue.length;
                tmp += (counts.positive.numChars >= 8) ? 1 : 0;

                counts.positive.requirements = (tmp >= 3) ? tmp : 0;
                counts.positive.middleNumber = matches.positive.middleNumber ? matches.positive.middleNumber.length : 0;
                counts.positive.middleSymbol = matches.positive.middleSymbol ? matches.positive.middleSymbol.length : 0;

                // Decrease strength level
                matches.negative.consecLower = ngModel.$viewValue.match(/(?=([a-z]{2}))/g);
                matches.negative.consecUpper = ngModel.$viewValue.match(/(?=([A-Z]{2}))/g);
                matches.negative.consecNumbers = ngModel.$viewValue.match(/(?=(\d{2}))/g);
                matches.negative.onlyNumbers = ngModel.$viewValue.match(/^[0-9]*$/g);
                matches.negative.onlyLetters = ngModel.$viewValue.match(/^([a-z]|[A-Z])*$/g);

                counts.negative.consecLower = matches.negative.consecLower ? matches.negative.consecLower.length : 0;
                counts.negative.consecUpper = matches.negative.consecUpper ? matches.negative.consecUpper.length : 0;
                counts.negative.consecNumbers = matches.negative.consecNumbers ? matches.negative.consecNumbers.length : 0;

                // Calculations
                strength += counts.positive.numChars * 4;
                if (counts.positive.upper) {
                    strength += (counts.positive.numChars - counts.positive.upper) * 2;
                }
                if (counts.positive.lower) {
                    strength += (counts.positive.numChars - counts.positive.lower) * 2;
                }
                if (counts.positive.upper || counts.positive.lower) {
                    strength += counts.positive.numbers * 4;
                }
                strength += counts.positive.symbols * 6;
                strength += (counts.positive.middleSymbol + counts.positive.middleNumber) * 2;
                strength += counts.positive.requirements * 2;

                strength -= counts.negative.consecLower * 2;
                strength -= counts.negative.consecUpper * 2;
                strength -= counts.negative.consecNumbers * 2;

                if (matches.negative.onlyNumbers) {
                    strength -= counts.positive.numChars;
                }
                if (matches.negative.onlyLetters) {
                    strength -= counts.positive.numChars;
                }

                strength = Math.max(0, Math.min(100, Math.round(strength)));

                if (strength > 85) {
                    angular
                        .forEach(strongest, (el) => {
                            el.style.backgroundColor = '#008cdd';
                        });
                } else if (strength > 65) {
                    angular
                        .forEach(strong, (el) => {
                            el.style.backgroundColor = '#6ead09';
                        });
                } else if (strength > 30) {
                    angular
                        .forEach(weak, (el) => {
                            el.style.backgroundColor = '#e09115';
                        });
                } else {
                    weakest.style.backgroundColor = '#e01414';
                }
            }
        });
}

@Directive({
    selector: 'passwordStrength',
    require: 'ngModel',
    template: '<span class="password-strength-indicator"><span></span><span></span><span></span><span></span></span>',
    link
})
export class PasswordStrengthDirective {

}
