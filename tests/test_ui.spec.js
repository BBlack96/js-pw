const { test, expect } = require('@playwright/test');

const base_url = "https://stage.reversly.com/";

// Устройства
const devices = {
  ipad_gen_5: { width: 768, height: 1024 },
  ipad_pro_11: { width: 834, height: 1194 },
  galaxy_note_2: { width: 360, height: 640 },
  iphone_12: { width: 390, height: 844 },
  iphone_14_pro: { width: 393, height: 852 },
  pixel_4a_5g: { width: 393, height: 851 }
};

// Языки
const languages = [
  "en",
  // "cs", "de", "es", "el", "fr", "hu", "fi", "is", "et", "hi", "yue",
  // "th", "bn", "ms", "ko", "hr", "zh-CN", "ga", "id", "ja", "sv", "it", "bg",
  // "sr", "uk", "he", "sk", "da", "ar", "nl", "no", "pl", "cz", "pt", "ro",
  // "sl", "tr", "pt-br"
];

// Страницы
const pages = {
  home: "/",
  about: "/about",
  contact: "/contact",
  pricing: "/pricing",
  unsubscribe: "/unsubscribe",
  login: "/login",
  privacy: "/privacy-policy",
  terms: "/terms",
  faq: "/faq",
};

test.describe.parallel('Snapshot tests', () => {

  // Настраиваем один браузер для всех тестов в воркере
  test.beforeAll(async ({ browser }) => {
    global.browserInstance = browser;
  });

  test.afterAll(async () => {
    // Здесь можно закрывать браузер, но Playwright сам его закроет после тестов
    global.browserInstance = null;
  });

  // Основной тест с параметризацией
  for (const deviceName in devices) {
    for (const language of languages) {
      for (const pageKey in pages) {
        const device = devices[deviceName];
        const pageUrl = pages[pageKey];

        test(`${pageKey} page on ${deviceName} in ${language}`, async ({ browser }) => {
          const context = await global.browserInstance.newContext({
            viewport: device,
            locale: language,
            userAgent: `snapshot-test-${deviceName}-${language}`,
          });

          const page = await context.newPage();
          await page.goto(`${base_url}${pageUrl}`);
          await page.waitForLoadState('load');

          const screenshotPath = `snapshots/${deviceName}/'en'/${pageKey}.png`;

          // Сравнение или создание снимка
          await expect(page).toHaveScreenshot(screenshotPath, {
            fullPage: true,
          });

          await context.close();
        });
      }
    }
  }
});
