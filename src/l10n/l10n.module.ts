import { UtilsModule } from '@/utils';
import { Module } from '@nestjs/common';
import { L10nService } from './l10n.service';

@Module({
	providers: [L10nService],
	exports: [L10nService],
	imports: [UtilsModule],
})
export class L10nModule {}
