import { IAttributes, IAugmentedJQuery, INgModelController, IScope } from 'angular';
import { Directive } from 'angular-ts-decorators';

function link(scope: IScope & {otherModelValue: string}, element: IAugmentedJQuery, attributes: IAttributes, ngModel: INgModelController) {
    ngModel.$validators.compareTo = (modelValue) => {
        return modelValue === scope.otherModelValue;
    };
    scope.$watch('otherModelValue', () => {
        ngModel.$validate();
    });
}

@Directive({
    selector: 'passwordMatch',
    require: 'ngModel',
    scope: {
        otherModelValue: '=passwordMatch'
    },
    link
})
export class PasswordMatchDirective {

}
