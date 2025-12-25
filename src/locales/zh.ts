const zh = {
  app: {
    title: 'ESPConnect',
    sectionsLabel: '板块',
    resourcesLabel: '资源',
  },
  navigation: {
    deviceInfo: '设备信息',
    partitions: '分区',
    apps: '应用',
    nvs: 'NVS 检查',
    spiffs: 'SPIFFS 工具',
    littlefs: 'LittleFS 工具',
    fatfs: 'FATFS 工具',
    flash: '闪存工具',
    console: '串口监视器',
    log: '会话日志',
    about: '关于',
  },
  resources: {
    tutorial: '教程',
    buyCoffee: '请我喝杯咖啡',
    getHelp: '获取帮助',
  },
  actions: {
    connect: '连接',
    disconnect: '断开连接',
  },
  forms: {
    baudRate: '波特率',
  },
  tooltips: {
    higherBaud: '可以使用更高的波特率',
  },
  alerts: {
    browserUnsupported:
      '此浏览器不支持 Web Serial API。请使用 Chrome、Edge 或其他基于 Chromium 的浏览器。',
    serialMonitorClosed: '串口监视器已关闭 - 单击“连接”重新进入维护模式。',
  },
  dialogs: {
    connecting: '正在连接',
    littlefsBackup: 'LittleFS 备份',
    littlefsLoading: '正在加载 LittleFS',
    littlefsSaving: '正在保存 LittleFS',
    preparingBackup: '正在准备备份...',
    writingLittlefs: '正在写入 LittleFS 映像...',
    littlefsRestoring: '正在还原 LittleFS',
    fatfsBackup: 'FATFS 备份',
    cancel: '取消',
    confirm: '确认',
    continue: '继续',
    confirmationTitle: '请确认',
  },
  disconnected: {
    defaultTitle: '未连接设备',
    defaultSubtitle: '连接到 ESP32 以继续。',
    deviceInfo: '连接到 ESP32 以查看设备信息。',
    nvs: '连接到具有 NVS 分区的 ESP32 以检查存储的键/值对。',
    spiffs: '连接到 ESP32 以浏览和编辑 SPIFFS 文件。',
    littlefs: '连接到具有 LittleFS 分区的 ESP32 以使用这些工具。',
    fatfs: '连接到具有 FATFS 分区的 ESP32 以使用这些工具。',
    apps: '连接设备以检查 OTA 应用槽。',
    flash: '连接你的板子以烧录固件或检查寄存器。',
  },
  language: {
    english: '英语',
    chinese: '中文',
    switchTo: '切换到{language}',
  },
  theme: {
    light: '亮色',
    dark: '暗色',
    switch: '切换到{theme}主题',
  },
  status: {
    connected: '已连接',
    disconnected: '未连接',
    preparingBackup: '正在准备备份...',
    writingLittlefs: '正在写入 LittleFS 映像...',
  },
};

export default zh;
