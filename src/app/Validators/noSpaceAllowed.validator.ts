import { AbstractControl, FormControl } from "@angular/forms";

export class CustomValidators{
    static noSpaceAllowed = ( control: FormControl) => {
        if( control.value != null && control.value.indexOf(' ') != -1){
            return { noSpaceAllowed: true};
        }
        return null;
    }

    static checkusername(control: AbstractControl): Promise<any> {
        return userNameAllowed(control.value);
    }
}

function userNameAllowed( username: string){
    const takenUserNames = ['admin','superuser','user'];

    return new Promise( (resolve, reject) =>{
        setTimeout(() => {
            if( takenUserNames.includes(username) ){
                resolve( { userNameNotAllowed: true } );
            }
            else{
                resolve (null)
            }
        }, 5000);
    })
}