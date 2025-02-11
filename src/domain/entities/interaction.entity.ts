export class Interaction {
  private _id: number;
  private _message: string;
  private _timestamp: Date;

  private constructor(message: string) {
    this._message = message;
    this._timestamp = new Date();
  }

  static create(message: string) {
    return new this(message);
  }

  get id() {
    return this._id;
  }

  get message() {
    return this._message;
  }

  get timestamp() {
    return this._timestamp;
  }

  set message(message: string) {
    this._message = message;
  }

  set timestamp(date: Date) {
    this._timestamp = date;
  }
}
