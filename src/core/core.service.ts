import { EventEmitter } from 'node:events';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Name } from '@/helpers';

export const CoreServiceInjectionToken = Symbol('CORE_SERVICE');

export enum CoreServiceScopes {
	sendNotify = 'send_notify',
}

const subscribeScopes = [CoreServiceScopes.sendNotify];

@Injectable()
@Name('CoreService')
export class CoreService implements OnModuleInit {
	private readonly ee = new EventEmitter();
	private readonly logger = new Logger(CoreService.name);

	constructor(
		@Inject(CoreServiceInjectionToken) private readonly client: ClientProxy,
	) {}

	private subscribeToCore() {
		this.client
			.send(
				{
					controller: 'tasks',
					method: 'subscribe',
				},
				{
					name: 'Telegram Plugin',
					scopes: subscribeScopes,
				},
			)
			.subscribe(({ event, data }) => this.ee.emit(event, data));
	}

	async onModuleInit() {
		const start = Date.now();
		await this.client.connect();
		this.logger.log(
			`Connected in ${
				Date.now() - start
			}ms within scopes of ${subscribeScopes.join(', ')}`,
		);
		this.subscribeToCore();
	}

	on(event: string, callback: (...args: any[]) => void) {
		this.ee.on(event, callback);
	}

	off(event: string, callback: (...args: any[]) => void) {
		this.ee.off(event, callback);
	}
}
