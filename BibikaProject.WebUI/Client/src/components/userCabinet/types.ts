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

export interface IContact {
  name: string;
}

export interface IPassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IEmail {
  newEmail: string;
  password: string;
}
