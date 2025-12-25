import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import { i18n, messages } from './i18n';
import { en as vuetifyEn, zhHans as vuetifyZhHans } from 'vuetify/locale';

const mergedMessages = {
  en: { ...messages.en, $vuetify: vuetifyEn },
  zh: { ...messages.zh, $vuetify: vuetifyZhHans },
};

export default createVuetify({
  components,
  directives,
  locale: {
    adapter: createVueI18nAdapter({
      i18n,
      useI18n,
    }),
    messages: mergedMessages,
  },
});
