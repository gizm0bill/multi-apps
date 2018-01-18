import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {

  beforeAll(async () =>
  {
    await browser.get('/');
  });

  it('should display login page', async () =>
  {
    const subject = await element(by.css('.logins')).isPresent();
    expect(subject).toEqual(true);
  });

  it('should login with a specific role', async () =>
  {
    await element( by.css('#login-both') ).click();
    const h1 = await element( by.css('h1') ).isPresent();
    debugger;
    expect(h1).toBeTruthy();
  });

});
