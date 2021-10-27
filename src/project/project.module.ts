import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectController } from "./project.controller";
import { Project } from "./project.entity";
import { ProjectService } from "./project.service";

// TODO: Use guard or middleware or pipe to allow user to access based on their permission level

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
