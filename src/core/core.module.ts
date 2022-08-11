import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UtilsModule, UtilsService } from '@/utils';
import { CoreService, CoreServiceInjectionToken } from './core.service';

@Module({
	providers: [CoreService],
	exports: [CoreService],
	imports: [
		ClientsModule.registerAsync([
			{
				imports: [UtilsModule],
				inject: [UtilsService],
				name: CoreServiceInjectionToken,
				useFactory: (utils: UtilsService) => {
					return {
						transport: Transport.TCP,
						options: {
							host: utils.env('CORE_HOST'),
							port: Number(utils.env('CORE_PORT')),
						},
					};
				},
			},
		]),
	],
})
export class CoreModule {}
