export interface IProfileCarPreview {
  mainImageSrc: string;
  price: number;
  title: string;
  location: string;
  likes: number;
  views: number;
  messages: number;
  id: number;
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
