import { Controller, Post } from '@nestjs/common';
import { CreateLeadInteractor } from '../../application/interactors/create-lead.interactor';

@Controller()
export class CreateLeadController {
  constructor(private readonly _createLeadInteractor: CreateLeadInteractor) {}

  @Post()
  async execute(command: any): Promise<any> {
    return await this._createLeadInteractor.execute(command);
  }
}
