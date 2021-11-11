import { Controller, Get, Param } from '@nestjs/common';
import { FindUserResponseDTO } from './dto/find-user-response-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindUserResponseDTO> {
    return await this.usersService.find(id);
  }
}
