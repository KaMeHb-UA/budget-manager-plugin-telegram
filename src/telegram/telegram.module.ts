import { UtilsModule } from '@/utils';
import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Module({
	providers: [TelegramService],
	exports: [TelegramService],
	imports: [UtilsModule],
})
export class TelegramModule {}
