import { TypeOrmModule } from "@nestjs/typeorm";

export const TestDatabaseModule = TypeOrmModule.forRoot({
  type: 'sqljs',
  entities: ['dist/**/*.entity.js', 'src/**/*.entity.ts'],
  migrations: ['resources/migrations/*.js'],
  migrationsRun: true
})
