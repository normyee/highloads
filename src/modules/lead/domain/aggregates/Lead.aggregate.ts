import { randomUUID } from 'crypto';
import { IAggregateRoot } from '../shared/abstractions/aggregate.interface';
import { Interaction } from '../entities/Interaction.entity';
import { LeadStatus } from '../value-objects/Lead-status';
import { Corporation } from '../entities/Corporation.entity';
import { Channel, CommunicationChannel } from 'src/modules/_shared/types';

export class Lead implements IAggregateRoot {
  private _id: string;
  private _name: string;
  private _email: string;
  private _corporation: Corporation;
  private _status: LeadStatus;
  private _interactions: Interaction[] = [];
  private _channel: Channel;

  public channels = CommunicationChannel;

  private constructor(
    id: string,
    name: string,
    email: string,
    status: LeadStatus,
    corporation: Corporation,
    interactions: Interaction[],
    channel: Channel,
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._status = status;
    this._corporation = corporation;
    this._channel = channel;
    this._interactions = interactions;
  }

  static create({
    id,
    name,
    email,
    status,
    corporation,
    channel,
    interactions,
  }: {
    id?: string;
    name: string;
    email: string;
    status: string;
    corporation: Corporation;
    channel: Channel;
    interactions: Interaction[];
  }): Lead {
    if (!id) id = randomUUID();

    const lead = new Lead(
      id,
      name,
      email,
      LeadStatus.create(status),
      corporation,
      [],
      channel,
    );

    for (let i = 0; i > interactions.length; i++)
      lead.addInteraction(interactions[i]);

    return lead;
  }

  addInteraction(interactionMessage: Interaction) {
    this._interactions.push(Interaction.create(interactionMessage));
  }

  updateStatus(newStatus: string) {
    this._status = LeadStatus.create(newStatus);
  }

  get id() {
    return this._id;
  }

  get corporation() {
    return this._corporation;
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

  set pickChannel(channel: Channel) {
    this._channel = channel;
  }

  get channel() {
    return this._channel;
  }
}
