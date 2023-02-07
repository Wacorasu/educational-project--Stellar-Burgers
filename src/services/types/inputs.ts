export type TEmPasLogInputs = {
    email: string;
    name: string;
    password: string;
    inputEmailError : boolean;
    inputEmailErrorText : string | undefined;
    inputNameError : boolean;
    inputNameErrorText: string | undefined;
    inputPasswordError: boolean;
    inputPasswordErrorText: string | undefined;
}