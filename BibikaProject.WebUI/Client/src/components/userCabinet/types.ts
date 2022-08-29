export interface IProfileCarPreview {
  mainImageSrc: string;
  price: number;
  title: string;
  place: string;
  likes: number;
  watches: number;
  messages: number;
}

export interface IUpdateContactModel {
  name: string;
}

export interface IConfirmOldPasswordModel {
  oldPassword: string;
}

export interface IUpdatePasswordModel {
  newPassword: string;
  confirmPassword: string;
}

export interface IResetPasswordRequestModel {
  email: string,
  newPassword: string,
  token: string
}

export interface IUpdateEmailModel {
  newEmail: string;
  password: string;
}
