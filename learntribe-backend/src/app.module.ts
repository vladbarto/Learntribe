import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LecturesModule } from './lectures/lectures.module';
import { AuthModule } from './auth/auth.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { EnrollmentModule } from './enrollments/enrollment.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'Your_Link_To_MongoDB_Server',
    ),
    LecturesModule,
    AuthModule,
    ChatbotModule,
    EnrollmentModule,
  ],
  controllers: [AppController],
  providers: [AppService], // Remove LecturesService from here
})
export class AppModule {}
