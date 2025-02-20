import { Injectable } from '@nestjs/common';
import { IEventHandler } from '../abstractions/event-handler.abstraction';

type UnknownEvent = any;

@Injectable()
export class EventDispatcher {
  private _handlers = new Map<string, IEventHandler<UnknownEvent>[]>();

  register<T>(eventType: string, handler: IEventHandler<T>) {
    if (!this._handlers.has(eventType))
      return this._handlers.set(eventType, []);

    return this._handlers.get(eventType).push(handler);
  }

  async execute<T>(event: T) {
    const eventType = event.constructor.name;

    const handlers = this._handlers.get(eventType) || [];

    for (const handler of handlers) {
      if (handler) await handler.execute(event);
    }
  }
}
