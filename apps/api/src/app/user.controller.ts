import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getAll(): any[] {
    return [
      { id: 'user1', email: 'user1@inter.net' },
      { id: 'user2', email: 'user2@inter.net' }
    ];
  }

  @Get(':id')
  getById(@Param('id') id: string): any {
    return { id, email: `${id}@inter.net` };
  }

  @Post()
  create(@Body() { email }: { email: string }) {
    return {
      id: '000000',
      email: email,
      consents: []
    };
  }

  @Delete(':id')
  deleteByid(@Param('id') id: string) {
    return true;
  }
}
