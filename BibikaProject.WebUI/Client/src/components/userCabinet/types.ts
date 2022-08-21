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

export interface IUpdatePasswordModel {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUpdateEmailModel {
  newEmail: string;
  password: string;
}
