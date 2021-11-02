import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectController } from "./projects.controller";
import { Project } from "./entities/project.entity";
import { ProjectService } from "./projects.service";
import { Permission } from "../permissions/entities/permission.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Project, Permission])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
