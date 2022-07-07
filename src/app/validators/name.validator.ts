import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NameValidator {
    static cannotContainOnlySpace(control: AbstractControl): ValidationErrors|null {
        if((control.value as string) !=="" &&(control.value as string).trim() == ""){
            // console.log(control.value);
            return {cannotContainOnlySpace: true};
        }
        return null;
    }
}