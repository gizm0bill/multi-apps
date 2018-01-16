import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {

  beforeEach(async () =>
  {
    await browser.get('/');
  });

  it('should have a title', async () => {
    const subject = await browser.getTitle();
    const result  = '💫';
    debugger;
    expect(subject).toEqual(result);
  });

  it('should have header', async () => {
    const subject = await element(by.css('h1')).isPresent();
    debugger;
    const result  = true;
    expect(subject).toEqual(result);
  });

});
