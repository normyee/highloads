import { Lead } from '../aggregates/Lead.aggregate';
import { IDomainEvent } from '../shared/abstractions/domain-event.interface';

export class LeadAddedEvent implements IDomainEvent {
  public type: string;
  occurredAt: Date;
  public lead: Lead;

  constructor(lead: Lead) {
    this.occurredAt = new Date();
    this.type = 'LEAD_CREATED';
    this.lead = lead;
  }
}
