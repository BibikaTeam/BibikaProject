import { IContact, IEmail, IPassword } from "../types";

export const saveContact = (values: IContact) => {
    console.log("contact", values);
}

export const savePassword = (values: IPassword) => {
    console.log("password", values);
}

export const saveEmail = (values: IEmail) => {
    console.log("email", values);
}