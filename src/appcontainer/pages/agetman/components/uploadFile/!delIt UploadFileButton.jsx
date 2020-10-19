import React from 'react';
import { resolveBrowserLocale } from 'react-admin';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useLocale } from 'react-admin';
//import { create, update } from './uploadFile';
import englishMessages from 'ra-language-english';
import spanishMessages from 'ra-language-spanish';
import chineseMessages from 'ra-language-chinese';

import * as domainMessages from './i18n';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import { Button } from '@material-ui/core';
import { ImportConfig } from './config.interface';

const UploadFileButton = (props) => {

  const locale = useLocale();
  const messages = {
    es: { ...spanishMessages, ...domainMessages.es },
    en: { ...englishMessages, ...domainMessages.en },
    cn: { ...chineseMessages, ...domainMessages.cn },
  };
  
  const i18nProvider = polyglotI18nProvider(
    (locale) => (messages[locale] ? messages[locale] : messages.en),
    locale || resolveBrowserLocale()
  );

  let { variant, label } = props;

  if (ImportConfig.logging) {
    console.log({ props });
  }

  if (!label) {
    label = i18nProvider.translate('csv.main.import');
  }

  if (!variant) {
    variant = 'text';
  }

  const openImportDialog = () => {
  };

  return (
    <Button
      color='primary'
      variant={variant}
      label={label}
      onClick={openImportDialog}
    >
      <GetAppIcon style={{ transform: 'rotate(180deg)', fontSize: '20' }} />
    </Button>
  );
};

export default UploadFileButton;