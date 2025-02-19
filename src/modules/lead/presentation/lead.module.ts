import { Module } from '@nestjs/common';
import { LeadController } from './http/create-lead.controller';

@Module({
  imports: [],
  controllers: [LeadController],
  providers: [],
})
export class AppModule {}
