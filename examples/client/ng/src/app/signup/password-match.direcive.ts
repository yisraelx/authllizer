import { IScope, IAugmentedJQuery, IAttributes, INgModelController } from 'angular';
import { Directive} from 'angular-ts-decorators';

@Directive({
  selector: 'passwordMatch',
  require: 'ngModel',
  scope: {
    otherModelValue: '=passwordMatch'
  }
})
export class PasswordMatchDirective {

  link(scope: IScope & {otherModelValue: string}, element: IAugmentedJQuery, attributes: IAttributes, ngModel: INgModelController) {
    ngModel.$validators.compareTo = (modelValue) =>{
      return modelValue === scope.otherModelValue;
    };
    scope.$watch('otherModelValue', () =>{
      ngModel.$validate();
    });
  }

}
