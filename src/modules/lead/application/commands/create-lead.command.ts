import { Channel } from 'src/modules/_shared/types';
import { Corporation } from '../../domain/entities/Corporation.entity';
import { Interaction } from '../../domain/entities/Interaction.entity';

export class CreateLeadCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly corporation: Corporation,
    public readonly status: string,
    public readonly interactions: Interaction[],
    public readonly channel: Channel,
  ) {}
}