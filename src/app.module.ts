import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { UsersModule } from './users/users.module';

const MONGO_CONFIG = config.get('mongo');

@Module({
  imports: [
    MongooseModule.forRoot(`${MONGO_CONFIG.host}/${MONGO_CONFIG.dbName}`),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
