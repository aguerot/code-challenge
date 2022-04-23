import { Body, Controller, Post, UnprocessableEntityException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Consent } from './domain/consent';
import { AppendConsents } from './usecase/append-consent/append-consent.command';

class UserDto {
  @ApiProperty({ type: String, required: true })
  id: string;
}

class AppendConsentsDto {
  @ApiProperty({ type: UserDto, required: true })
  user: UserDto;

  @ApiProperty({ type: Consent, isArray: true, required: true, minItems: 1 })
  consents: Consent[];
}

@Controller('consents')
@ApiTags('Consents')
export class ConsentController {
  constructor(private readonly _commandBus: CommandBus) {
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Append a new consent to an existing user' })
  @ApiResponse({ status: 422, description: 'Unprocessable entity' })
  async appendConsents(@Body() dto: AppendConsentsDto) {
    if (!dto.consents || dto.consents.length === 0) {
      throw new UnprocessableEntityException();
    }

    const success = await this._commandBus.execute<AppendConsents, boolean>(new AppendConsents(dto.user.id, dto.consents));

    if (!success) {
      throw new UnprocessableEntityException();
    }

    return success;
  }
}
