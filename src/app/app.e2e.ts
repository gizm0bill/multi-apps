import { browser, by, element, ElementFinder } from 'protractor';
import 'tslib';

const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
const tryUntil = async (func, time, interval) =>
{
  while ( !( await func() ) && time > Date.now() ) await timeoutPromise(interval);
};

describe('App', () =>
{
  beforeAll(async () =>
  {
    await browser.get('/');
  });

  it('should display login page', async () =>
  {
    // no login at first load, test if logins list is there
    const subject = await element(by.css('.logins')).isPresent();
    expect(subject).toEqual(true);
  });

  it('should login with a specific role', async () =>
  {
    // clicking a login item should load the dashboard, which has a h1 title
    await element( by.css('#login-both') ).click();
    const h1 = await element( by.css('h1') ).isPresent();
    expect(h1).toBeTruthy();
  });

  it('should load some app', async () =>
  {
    // get the dashboard component first to test at the end
    const initialCom = await element( by.css('router-outlet + *') );
    // available apps list is loaded async so try to click the s*^t out of it until we can
    await tryUntil( async () =>
    {
      try // throws error if it tries to click without elemen visible
      {
        await element( by.css('.mat-grid-tile') ).click();
        return true;
      }
      catch(e) { return false; }
    }, Date.now() + 3000, 100 );
    const subject = await element( by.css('router-outlet + *') );
    // test if dasboard component has been replaced
    expect( initialCom ).not.toEqual( subject );
    debugger;
  });

});
