export interface IChatMessage {
  text: string;
  from: string;
  to: string;
  date: Date;
}

export interface IMessage {
  text: string;
  from: string;
  to: string;
  date: Date | undefined;
}
