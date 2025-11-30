import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { EvaluationModule } from './evaluation/evaluation.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule,
    DatabaseModule,
    EvaluationModule,
  ],
})
export class AppModule {}
