import { IValueObject } from '../shared/abstractions/value-object.interface';
import { validateInclude } from '../shared/validations/validations';
import { STATUS } from '../consts';

export class LeadStatus implements IValueObject<string> {
  private readonly _status: string;
  private static readonly _validStatuses = STATUS;

  private constructor(status: string) {
    this._status = status;
    Object.freeze(this);
  }

  static create(status: string): LeadStatus {
    if (!validateInclude(this._validStatuses, status))
      throw new Error(`Status inválido: ${status}`);

    return new this(status);
  }

  value(): string {
    return this._status;
  }
}
