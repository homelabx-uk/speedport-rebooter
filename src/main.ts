import { Speedport } from "./speedport";
import { isInternetConnected } from "@/is-internet-connected";

const speedport = new Speedport(process.env.SPEEDPORT_PASSWORD!);

let offline = false;

async function check() {
  if (await isInternetConnected()) {
    if (offline) {
      console.log("we are back online again."); // TODO send to discord
      offline = false;
    }
    setTimeout(check, 60 * 1000); // 1 minute
  } else {
    offline = true;
    console.error("internet connection lost. rebooting speedport...");
    try {
      await speedport.reboot();
    } catch (e) {
      console.error("failed to reboot speedport", e);
    }
    setTimeout(check, 10 * 60 * 1000); // 10 minutes
  }
}
check();

process.on("SIGTERM", () => {
  process.exit();
});
