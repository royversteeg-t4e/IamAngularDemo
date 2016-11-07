import { IamAngularDemoPage } from './app.po';

describe('iam-angular-demo App', function() {
  let page: IamAngularDemoPage;

  beforeEach(() => {
    page = new IamAngularDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
