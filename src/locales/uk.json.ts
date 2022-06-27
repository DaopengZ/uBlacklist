import { exportAsMessages } from './helpers';

exportAsMessages('_locales/uk/messages.json', {
  extensionName: 'uBlacklist',
  extensionDescription: 'Блокує визначені Вами сайти, що появляються в результатах пошуку Google',
  lang: 'uk',
  error: 'Помилка: $1',
  unauthorizedError: 'Не авторизовано. Вимкніть синхронізацію і спробуйте ще раз.',
  cancelButton: 'Скасувати',
  okButton: 'Гаразд',
  content_singleSiteBlocked: 'uBlacklist заблокував 1 сайт',
  content_multipleSitesBlocked: 'uBlacklist заблокував $1 сайтів',
  content_showBlockedSitesLink: 'Показати',
  content_hideBlockedSitesLink: 'Сховати',
  content_blockSiteLink: 'Заблокувати сайт',
  content_unblockSiteLink: 'Розблокувати сайт',
  popup_blockSiteTitle: 'Заблокувати цей сайт',
  popup_unblockSiteTitle: 'Розблокувати цей сайт',
  popup_details: 'Деталі',
  popup_pageURLLabel: 'URL сторінки',
  popup_pathDepth: 'Depth',
  popup_pageTitleLabel: 'Заголовок сторінки',
  popup_addedRulesLabel: 'Правила, що додаються',
  popup_removedRulesLabel: 'Правила, що вилучаються',
  popup_blockSiteButton: 'Блокувати',
  popup_unblockSiteButton: 'Розблокувати',
  popup_openOptionsLink: 'Параметри',
  options_generalTitle: 'Загальні',
  options_blacklistLabel: 'Сайти, що вилучаються з пошукових результатів Google',
  options_blacklistHelper:
    'Можна використовувати [зіставляння з маскою](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns) або [регулярні вирази](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).',
  options_blacklistExample: 'Приклад: $1',
  options_blockByTitle:
    'Щоб заблокувати сайт по заголовку сторінки, додайте "title" перед регулярним виразом.',
  options_blacklistUpdated: 'Оновлено',
  options_reloadBlacklistButton: 'Оновити',
  options_importBlacklistButton: 'Імпорт',
  options_exportBlacklistButton: 'Експорт',
  options_saveBlacklistButton: 'Зберегти',
  options_importBlacklistDialog_title: 'Імпортувати',
  options_importBlacklistDialog_fromFile: 'Імпортувати з файлу',
  options_importBlacklistDialog_selectFile: 'Обрати файл',
  options_importBlacklistDialog_fromPB: 'Імпортувати особистий список',
  options_importBlacklistDialog_pbLabel: 'Домени',
  options_importBlacklistDialog_append: 'Дописати до наявного списку',
  options_importBlacklistDialog_importButton: 'Імпорт',
  options_importBlacklistDialog_helper: 'Вставте домени з Вашого особистого списку.',
  options_otherSearchEngines: 'Інші пошукові системи',
  options_otherSearchEnginesDescription:
    'Це розширення можна використовувати для перелічених нижче пошуковиків.',
  options_registerSearchEngine: 'Дозволити',
  options_searchEngineRegistered: 'Дозволено',
  options_skipBlockDialogLabel: 'Пропускати вікно «Заблокувати цей сайт»',
  options_hideBlockLinksLabel: 'Сховати посилання «Заблокувати сайт»',
  options_hideControlLabel: 'Ховати к-сть заблокованих сайтів і ланку «Показати»',
  options_appearanceTitle: 'Вигляд',
  options_linkColor: 'Колір посилань',
  options_blockColor: 'Колір заблокованих пошукових результатів',
  options_colorUseDefault: 'Типовий',
  options_colorSpecify: 'Власний',
  options_highlightColors: 'Кольори виділених результатів пошуку',
  options_highlightDescription:
    'Щоб виділити пошуковий результат із Кольором N, додайте на початку правила «@N».',
  options_highlightColorNth: 'Колір $1',
  options_highlightColorAdd: 'Додати',
  options_highlightColorRemove: 'Вилучити',
  options_dialogTheme: 'Тема вікна «Заблокувати цей сайт» у результатах пошуку',
  options_dialogThemeDefault: 'Типова',
  options_dialogThemeLight: 'Світла',
  options_dialogThemeDark: 'Темна',
  options_syncTitle: 'Синхронізація',
  options_syncFeatureUpdated:
    'Функцію синхронізування оновлено. Щоб продовжити користуватися синхронізуванням, натисніть кнопку «Увімкнути».',
  options_syncFeature: 'Синхронізувати з хмарою',
  options_syncFeatureDescription:
    'Списки блокування можна синхронізувати з Вашими пристроями через хмару.',
  options_turnOnSync: 'Увімкнути',
  options_turnOnSyncDialog_title: 'Увімкнути синхронізацію',
  options_turnOnSyncDialog_turnOnSyncButton: 'Увімкнути',
  options_turnOnSyncDialog_altFlowDescription:
    'Вас можуть запитати дозвіл доступу до $1 перед автентифікацією, але Ваша персональна інформація не зберігатиметься на цьому домені.',
  options_turnOnSyncDialog_altFlowAuthCodeLabel: 'Код авторизації',
  options_turnOffSync: 'Вимкнути',
  options_syncResult: 'Остання синхронізація',
  options_syncNever: 'Не синхронізовано',
  options_syncRunning: 'Синхронізування...',
  options_syncReloadButton: 'Оновити',
  options_syncNowButton: 'Синхр. зараз',
  options_syncCategories: 'Що синхронізувати?',
  options_syncBlocklist: 'Заблоковані сайти',
  options_syncGeneral: 'Загальні налаштування',
  options_syncAppearance: 'Вигляд',
  options_syncSubscriptions: 'Підписки',
  options_syncInterval: 'Період синхронізації',
  options_subscriptionTitle: 'Підписка',
  options_subscriptionFeature: 'Підписатися на списки блокування',
  options_subscriptionFeatureDescription:
    'Коли Ви додасьте підписку — списки блокування періодично завантажуватимуться з вказаної URL-адреси.',
  options_addSubscriptionButton: 'Додати джерело',
  options_subscriptionNameHeader: 'Назва',
  options_subscriptionURLHeader: 'URL-адреса',
  options_subscriptionUpdateResultHeader: 'Востаннє оновлено',
  options_subscriptionMenuButtonLabel: 'Меню',
  options_noSubscriptionsAdded: 'Не додано підписок',
  options_subscriptionUpdateRunning: 'Оновлення...',
  options_showSubscriptionMenu: 'Показати',
  options_updateSubscriptionNowMenu: 'Оновити зараз',
  options_removeSubscriptionMenu: 'Вилучити',
  options_updateAllSubscriptionsNowButton: 'Оновити зараз',
  options_addSubscriptionDialog_title: 'Додати джерело',
  options_addSubscriptionDialog_nameLabel: 'Назва',
  options_addSubscriptionDialog_urlLabel: 'URL-адреса',
  options_addSubscriptionDialog_addButton: 'Додати',
  options_showSubscriptionDialog_blacklistLabel: 'Правила',
  options_updateInterval: 'Період оновлення',
  clouds_googleDriveSync: 'Синхр. з Google Drive',
  clouds_googleDriveSyncDescription:
    'Файл створиться в теці для програмних даних, що прихована від користувача.',
  clouds_googleDriveSyncTurnedOn: 'Синхронізовано з Google Drive',
  clouds_dropboxSync: 'Синхр. з Dropbox',
  clouds_dropboxSyncDescription: 'Файл створиться в "/Apps/uBlacklist/".',
  clouds_dropboxSyncTurnedOn: 'Синхронізовано з Dropbox',
  searchEngines_googleName: 'Google',
  searchEngines_bingName: 'Bing',
  searchEngines_braveName: 'Brave',
  searchEngines_duckduckgoName: 'DuckDuckGo',
  searchEngines_ecosiaName: 'Ecosia',
  searchEngines_qwantName: 'Qwant',
  searchEngines_startpageName: 'Startpage.com',
});
