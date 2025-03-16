import { Speedport } from "./speedport";
import { isInternetConnected } from "@/is-internet-connected";

const speedport = new Speedport(process.env.SPEEDPORT_PASSWORD!);
const reboots = new Array<{ date: Date; rebootSuccess: boolean }>();

await speedport.reboot();
await new Promise((res) => setTimeout(res, 10 * 60 * 1000));

// TODO add reporting
/*const _reboots = reboots.splice(0);
console.log(`network connection was lost ${_reboots.length} times.`);
console.log(`reboots were `);*/

async function check() {
  if (await isInternetConnected()) {
    setTimeout(check, 60 * 1000); // 1 minute
  } else {
    console.error("internet connection lost. rebooting speedport...");
    try {
      await speedport.reboot();
      reboots.push({ date: new Date(), rebootSuccess: true });
    } catch (e) {
      reboots.push({ date: new Date(), rebootSuccess: false });
      console.error("failed to reboot speedport", e);
    }
    setTimeout(check, 10 * 60 * 1000); // 10 minutes
  }
}
check();
