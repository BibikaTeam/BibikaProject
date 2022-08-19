export interface IProfileCarPreview {
  mainImageSrc: string;
  price: number;
  title: string;
  place: string;
  likes: number;
  watches: number;
  messages: number;
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
