import send from '../helpers/send-message.js';
import translate from '../helpers/l10n.js';

export default async ({ type, data }) => {
    if(data.amount < 0){
        data.amount = -data.amount;
        data.direction_icon = '⇱';
    } else {
        data.direction_icon = '⇲';
    }
    await send(translate(type, data))
}
