class Helpers {
  async setIgnorePopUpCookie (domain: string) {
    return await browser.setCookies([
      {
        name: 'IgnorePopUpCookie',
        value: 'ignore',
        domain: `${domain}`,
        expiry: 1771965308,
        path: '/',
        secure: true
      },
      {
        name: 'ys-dw.sf.control.hidden',
        value: 'b%3A1',
        domain: `${domain}`,
        path: '',
        secure: false
      }
    ]);
  }

  async setDwCookie (domain: string) {
    return await browser.setCookies([
      {
        name: 'ys-dw.sf.control.hidden',
        value: 'b%3A1',
        domain: `${domain}`,
        path: '',
        secure: false
      }
    ]);
  }

  async setOneTrustCookie (domain: string) {
    return await browser.setCookies([
      {
        name: 'OptanonAlertBoxClosed',
        value: '2022-02-10T17:20:47.291Z',
        domain: `${domain}`,
        expiry: 1771965308,
        path: '',
        secure: false
      }
    ]);
  }
}

export const helpers = new Helpers();
