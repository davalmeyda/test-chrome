const puppeteer = require("puppeteer");

(async () => {
  // Lanza una instancia del navegador Chromium
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    // executablePath:
    //   "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: false,
    args: ["--start-maximized"], // Esto maximizará la ventana del navegador
  });
  
  // Abre una nueva página
  const pages = await browser.pages();
  const page = pages[0];

  await page.setCacheEnabled(false);

  // Borra todas las cookies
  const cookies = await page.cookies();
  await page.deleteCookie(...cookies);

  await page.setExtraHTTPHeaders({
    "navegador-sistemas": "v.1.0",
  });

  // Consigue las dimensiones de la ventana del navegador
  const { width, height } = await page.evaluate(() => {
    return {
      width: window.screen.availWidth,
      height: window.screen.availHeight - 100,
    };
  });

  // Establece las dimensiones de la página
  await page.setViewport({ width, height });

  // Navega a una URL
  await page.goto("https://manoturqueza.com");

  browser.on("disconnected", () => {
    process.exit(0);
  });
})();
