import { Inject, Injectable } from '@nestjs/common';
import { LeadAddedEvent } from 'src/modules/lead/domain/events/lead-added.event';
import { CreateLeadCommand } from '../commands/create-lead.command';
import { Lead } from '../../domain/aggregates/Lead.aggregate';
import { IEventBus } from '../abstractions/eventbus.abstraction';

@Injectable()
export class CreateLeadHandler {
  constructor(@Inject('IEventBus') private readonly _eventBus: IEventBus) {}

  async execute(command: CreateLeadCommand) {
    const { name, email, corporation, status, interactions, channel } = command;

    const lead = Lead.create({
      name,
      email,
      corporation,
      status,
      interactions,
      channel,
    });

    await this._eventBus.publish(new LeadAddedEvent(lead));
  }
}
