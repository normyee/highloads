import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { IEventBus } from 'src/modules/lead/application/abstractions/eventbus.abstraction';

@Injectable()
export class EventBusPublisherFactory {
  static async create({ queueName, connectionHost }: any) {
    const instance = new EventBusRabbitMQAdapter({ queueName, connectionHost });
    await instance.init();
    return instance;
  }
}

@Injectable()
export class EventBusRabbitMQAdapter implements IEventBus {
  private readonly _queueName: string;
  private readonly _connectionHost: string;
  private _connection: amqp.Connection;
  private _channel: amqp.Channel;

  constructor({ queueName, connectionHost }: any) {
    this._queueName = queueName;
    this._connectionHost = connectionHost;
  }

  public async init() {
    this._connection = await amqp.connect(this._connectionHost);
    this._channel = await this._connection.createChannel();
    await this._channel.assertQueue(this._queueName, { durable: false });
  }

  public async publish<T>(message: T) {
    if (!this._channel)
      throw new Error(
        'EventBusRabbitMQAdapter não foi inicializado. Chame init() primeiro.',
      );
    const msg = JSON.stringify(message);
    this._channel.sendToQueue(this._queueName, Buffer.from(msg));

    await this.close();
  }

  public async subscribe(
    callback: (message: any) => Promise<void>,
  ): Promise<void> {
    if (!this._channel)
      throw new Error(
        'EventBusRabbitMQAdapter não foi inicializado. Chame init() primeiro.',
      );

    await this._channel.consume(this._queueName, async (msg: any) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());

        try {
          await callback(message);

          this._channel.ack(msg);
        } catch (error) {
          console.error('Erro ao processar mensagem:', error);
        }
      }
    });
  }

  public async close() {
    setTimeout(() => {
      this._connection.close();
    }, 500);
  }
}