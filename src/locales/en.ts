const en = {
  app: {
    title: 'ESPConnect',
    sectionsLabel: 'Sections',
    resourcesLabel: 'Resources',
  },
  navigation: {
    deviceInfo: 'Device Info',
    partitions: 'Partitions',
    apps: 'Apps',
    nvs: 'NVS Inspector',
    spiffs: 'SPIFFS Tools',
    littlefs: 'LittleFS Tools',
    fatfs: 'FATFS Tools',
    flash: 'Flash Tools',
    console: 'Serial Monitor',
    log: 'Session Log',
    about: 'About',
  },
  resources: {
    tutorial: 'Tutorial',
    buyCoffee: 'Buy Me a Coffee',
    getHelp: 'Get Help',
  },
  actions: {
    connect: 'Connect',
    disconnect: 'Disconnect',
  },
  forms: {
    baudRate: 'Baud rate',
  },
  tooltips: {
    higherBaud: 'A higher baudrate can be used',
  },
  alerts: {
    browserUnsupported:
      'This browser does not support the Web Serial API. Use Chrome, Edge, or another Chromium-based browser.',
    serialMonitorClosed: 'Serial monitor closed - click Connect to re-enter maintenance mode.',
  },
  dialogs: {
    connecting: 'Connecting',
    littlefsBackup: 'LittleFS Backup',
    littlefsLoading: 'Loading LittleFS',
    littlefsSaving: 'Saving LittleFS',
    preparingBackup: 'Preparing backup...',
    writingLittlefs: 'Writing LittleFS image...',
    littlefsRestoring: 'Restoring LittleFS',
    fatfsBackup: 'FATFS Backup',
    cancel: 'Cancel',
    confirm: 'Confirm',
    continue: 'Continue',
    confirmationTitle: 'Please confirm',
  },
  disconnected: {
    defaultTitle: 'No device connected',
    defaultSubtitle: 'Connect to an ESP32 to continue.',
    deviceInfo: 'Connect to an ESP32 to see device information.',
    nvs: 'Connect to an ESP32 with an NVS partition to inspect stored key/value pairs.',
    spiffs: 'Connect to an ESP32 to browse and edit SPIFFS files.',
    littlefs: 'Connect to an ESP32 with a LittleFS partition to use these tools.',
    fatfs: 'Connect to an ESP32 with a FATFS partition to use these tools.',
    apps: 'Connect to a device to inspect OTA application slots.',
    flash: 'Connect to your board to flash firmware or inspect registers.',
  },
  language: {
    english: 'English',
    chinese: '简体中文',
    switchTo: 'Switch to {language}',
  },
  theme: {
    light: 'light',
    dark: 'dark',
    switch: 'Switch to {theme} theme',
  },
  status: {
    connected: 'Connected',
    disconnected: 'Disconnected',
    preparingBackup: 'Preparing backup...',
    writingLittlefs: 'Writing LittleFS image...',
  },
};

export default en;
