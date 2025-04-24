import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LecturesModule } from './lectures/lectures.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vlad:vlad@cluster0.2peqhho.mongodb.net/learntribe?retryWrites=true&w=majority&appName=Cluster0',
    ),
    LecturesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService], // Remove LecturesService from here
})
export class AppModule {}
