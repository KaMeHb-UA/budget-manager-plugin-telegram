import send from '../helpers/send-message.js';
import translate from '../helpers/l10n.js';

export default ({ type, data }) => send(translate(type, data))
