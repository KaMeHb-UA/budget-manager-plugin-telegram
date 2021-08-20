import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { resolve } from 'path';
import { env } from 'process';
import { fileURLToPath } from 'url';

const l10nDir = resolve(fileURLToPath(import.meta.url), '..', '..', 'l10n');
const defaultPhrases = load(readFileSync(resolve(l10nDir, 'en.yml'), 'utf8'));
const localizedPhrases = {};
try{ Object.assign(localizedPhrases, load(readFileSync(resolve(l10nDir, env.LANG + '.yml'), 'utf8'))) } catch(e){}

function fixHTML(rawText){
    return rawText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

function processTpl(text, args){
    for(const name in args) text.replaceAll(`%${name}%`, fixHTML(args[name]));
}

export default (phrase, args) => {
    if(phrase in localizedPhrases) return processTpl(localizedPhrases[phrase], args);
    if(phrase in defaultPhrases) return processTpl(defaultPhrases[phrase], args);
    return phrase;
}
