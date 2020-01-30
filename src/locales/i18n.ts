import i18next from 'i18next';

import { az } from './az';
import { en } from './en';
import { ru } from './ru';

i18next.init({
    lng: localStorage.getItem('lang') || 'az',
    debug: true,
    resources: { az, en, ru }
}, function (err, t) {
    // initialized and ready to go!
    // document.getElementById('output').innerHTML = i18next.t('key');
    return t('key')
});

export default i18next;