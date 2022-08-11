import { Name } from '@/helpers';
import { UtilsService } from '@/utils';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
@Name('TelegramService')
export class TelegramService {
	private readonly logger = new Logger(TelegramService.name);
	private token: string;
	private chat: string;

	constructor(utils: UtilsService) {
		this.token = utils.env('TELEGRAM_BOT_TOKEN');
		this.chat = utils.env('TELEGRAM_CHAT');
	}

	async sendMessage(text: string) {
		const start = Date.now();
		await fetch(`https://api.telegram.org/bot${this.token}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: this.chat,
				text,
				parse_mode: 'HTML',
			}),
		}).then((r) => r.json());
		this.logger.log(`Message sent in ${Date.now() - start}ms`);
	}
}
