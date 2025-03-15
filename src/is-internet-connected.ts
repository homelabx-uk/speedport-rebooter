import checkInternetConnected from "check-internet-connected";

export async function isInternetConnected(): Promise<boolean> {
  try {
    await checkInternetConnected({
      timeout: 250,
      retries: 5,
      domain: "https://google.com",
    });
    return true;
  } catch (_) {
    return false;
  }
}
