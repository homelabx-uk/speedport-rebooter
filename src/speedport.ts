import puppeteer from "puppeteer";

export class Speedport {
  constructor(private readonly password: string) {}

  async reboot() {
    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();

    await page.goto("http://speedport.ip/html/login/index.html");
    await page.waitForSelector("#router_password", { visible: true });
    await page.type("#router_password", this.password);
    await page.click("#loginbutton");
    await page.waitForNavigation();

    await page.goto("http://speedport.ip/html/content/config/problem_handling.html");
    await page.waitForSelector("h2[data-i18n=key_startNew]", { visible: true });
    await page.click("h2[data-i18n=key_startNew]");
    await page.click("#btn_reboot");

    await browser.close();
  }
}
