import { Body, Controller, Post, UnprocessableEntityException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Consent } from './domain/consent';
import { AppendConsents } from './usecase/append-consent/append-consent.command';

@Controller('consents')
export class ConsentController {
  constructor(private readonly _commandBus: CommandBus) {
  }

  @Post()
  async appendConsents(@Body() dto: { user: { id: string }, consents: Consent[] }) {
    if (!dto.consents || dto.consents.length === 0) {
      throw new UnprocessableEntityException();
    }

    const success = await this._commandBus.execute<AppendConsents, boolean>(new AppendConsents(dto.user.id, dto.consents));

    if(!success) {
      throw new UnprocessableEntityException();
    }

    return success;
  }
}
