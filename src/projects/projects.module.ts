import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectController } from "./projects.controller";
import { Project } from "./entities/project.entity";
import { ProjectService } from "./projects.service";

// TODO: Use guard or middleware or pipe to allow user to access based on their permission level

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
