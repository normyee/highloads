import { randomUUID } from 'crypto';

export class Interaction {
  private _id: string;
  private _message: string;
  private _timestamp: Date;

  private constructor({
    id,
    message,
    timestamp,
  }: {
    id?: string;
    message: string;
    timestamp: Date;
  }) {
    if (!id) this._id = randomUUID();
    this._id = id;
    this._message = message;
    if (!timestamp) this._timestamp = new Date();
    this._timestamp = timestamp;
  }

  static create({
    id,
    message,
    timestamp,
  }: {
    id: string;
    message: string;
    timestamp: Date;
  }) {
    return new this({ id, message, timestamp });
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
