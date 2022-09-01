import { IUpdateContactModel, IUpdatePasswordModel, IUpdateEmailModel } from "../types";

export const saveContact = (values: IUpdateContactModel) => {
    console.log("contact", values);
}

export const savePassword = (values: IUpdatePasswordModel) => {
    console.log("password", values);
}

export const saveEmail = (values: IUpdateEmailModel) => {
    console.log("email", values);
}