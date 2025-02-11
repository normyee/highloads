import { IAggregateRoot } from '../shared/abstractions/aggregate.interface';
import { Interaction } from '../entities/Interaction.entity';
import { LeadStatus } from '../value-objects/Lead-status';

export class Lead implements IAggregateRoot {
  private _id: string;
  private _name: string;
  private _email: string;
  private _status: LeadStatus;
  private _interactions: Interaction[] = [];

  private constructor(name: string, email: string, status: LeadStatus) {
    this._name = name;
    this._email = email;
    this._status = status;
  }

  addInteraction(interactionMessage: string) {
    this._interactions.push(Interaction.create(interactionMessage));
  }

  updateStatus(newStatus: string) {
    this._status = LeadStatus.create(newStatus);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get status() {
    return this._status.value;
  }

  get interactions() {
    return [...this._interactions];
  }
}
