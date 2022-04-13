import { Body, Controller, Post } from '@nestjs/common';

@Controller('consents')
export class ConsentController {
  @Post()
  appendConsents(@Body() dto: { id: string, consents: [] }) {
    return true;
  }
}
