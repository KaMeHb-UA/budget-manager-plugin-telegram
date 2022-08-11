import { Name } from '@/helpers';
import { UtilsService } from '@/utils';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
@Name('L10nService')
export class L10nService implements OnModuleInit {
	private readonly logger = new Logger(L10nService.name);
	private lang: string;
	private phrases: typeof import('./l10n.phrases.en');

	constructor(utils: UtilsService) {
		this.lang = utils.env('LANG');
	}

	async onModuleInit() {
		const langs = await import('./l10n.phrases');
		if (!(this.lang in langs)) {
			throw new Error(
				`Cannot find dictionary for ${this.lang} language. Is it specified correctly?`,
			);
		}
		this.phrases = langs[this.lang] as typeof langs[keyof typeof langs];
		this.logger.log(
			`Loaded ${Object.keys(this.phrases).length} phrases from "${
				this.lang
			}" dictionary`,
		);
	}

	translate(phrase: string, replacements: { [x: string]: string }): string {
		if (!(phrase in this.phrases)) {
			this.logger.warn(
				`Can't find phrase "${phrase}" in dictionary. Consider adding it first`,
			);
			return phrase;
		}
		let result: string = this.phrases[phrase];
		for (const i in replacements) {
			result = result.replaceAll(`%${i}%`, replacements[i]);
		}
		return result;
	}
}
