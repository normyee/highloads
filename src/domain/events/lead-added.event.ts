import { Lead } from '../aggregates/Lead.aggregate';
import { IDomainEvent } from '../shared/abstractions/domain-event.interface';

export class LeadEntityAdded implements IDomainEvent {
  occurredAt: Date;

  constructor(public lead: Lead) {
    this.occurredAt = new Date();
  }
}
