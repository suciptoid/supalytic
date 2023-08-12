export enum Browsers {
  Chrome = 'chrome',
  Firefox = 'firefox',
  Edge = 'edge-chromium'
}

export const browserIcons: Record<string, string> = {
  [Browsers.Chrome]: 'logos:chrome',
  [Browsers.Firefox]: 'logos:firefox',
  [Browsers.Edge]: 'logos:edge'
};

enum OS {
  Android = 'Android OS',
  MacOS = 'Mac OS',
  Windows10 = 'Windows 10',
  Linux = 'Linux',
  Unknown = 'Unknown'
}

export const osIcons: Record<string, string> = {
  [OS.Android]: 'flat-color-icons:android-os',
  [OS.MacOS]: 'logos:apple',
  [OS.Windows10]: 'logos:microsoft-windows-icon',
  [OS.Linux]: 'flat-color-icons:linux',
  [OS.Unknown]: 'flat-color-icons:linux'
};

enum Devices {
  Dekstop = 'desktop',
  Mobile = 'mobile',
  Tablet = 'tablet'
}

export const deviceIcons: Record<string, string> = {
  [Devices.Dekstop]: 'twemoji:desktop-computer',
  [Devices.Mobile]: 'flat-color-icons:phone-android',
  [Devices.Tablet]: 'flat-color-icons:tablet-android'
};
