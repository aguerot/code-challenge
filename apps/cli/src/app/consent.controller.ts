import { AppendConsents, ConsentIDs } from '@aguerot/consent-management';
import { ConsoleLogger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Command, Console } from 'nestjs-console';

@Console({
  command: 'consent',
  description: 'Manage user consents'
})
export class ConsentController {
  private readonly _logger = new ConsoleLogger();

  constructor(
    private readonly _commandBus: CommandBus) {
  }

  @Command({
    command: 'append <userId> <consentId> <enabled>',
    description: 'Append a consent to a user'
  })
  async appendConsent(
    userId: string,
    consentId: ConsentIDs,
    enabled: boolean
  ) {

    const appendConsentCommand = new AppendConsents(userId, [
      {
        id: consentId,
        enabled: enabled
      }
    ]);

    const result = await this._commandBus.execute<AppendConsents, boolean>(appendConsentCommand);

    this._logger.log(result);
  }


}
