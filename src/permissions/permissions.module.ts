import { HttpModule, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), HttpModule],
  controllers: [PermissionsController],
  providers: [PermissionsService, UsersService],
})
export class PermissionsModule {}
