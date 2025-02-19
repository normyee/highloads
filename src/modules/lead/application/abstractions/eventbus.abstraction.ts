export interface IEventBus {
  publish<T>(message: T): Promise<void>;
  subscribe(callback: (message: any) => Promise<void>): Promise<void>;
  close(): Promise<void>;
}