export const new_tx = `
<b>%provider%</b>
<b>%icon%</b> <code>%description%</code>: <b>%direction_icon%</b> %currency_prefix%<b>%amount%</b>%currency_suffix%
Comission: %currency_prefix%<b>%comission%</b>%currency_suffix%
Cashback: %currency_prefix%<b>%cashback%</b>%currency_suffix%
Rest balance: %currency_prefix%<b>%rest_balance%</b>%currency_suffix%
`.slice(1, -1);
