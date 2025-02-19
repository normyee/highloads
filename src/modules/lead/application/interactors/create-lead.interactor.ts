import { Injectable } from '@nestjs/common';
import { CreateLeadHandler } from '../handlers/create-lead.handler';

@Injectable()
export class CreateLeadInteractor {
  constructor(private readonly _createLeadHandler: CreateLeadHandler) {}

  async execute(command: any) {
    await this._createLeadHandler.execute(command);
  }
}
