export interface IEventHandler<T> {
  execute(event: T): Promise<void>;
}
