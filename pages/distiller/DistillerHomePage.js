import { Selector, t } from 'testcafe';
import DistillerSignInPage from './DistillerSignInPage';
import DistillerProfilePage from './DistillerProfilePage';

export default class DistillerHomePage {

  constructor() {
    this.signInNav = Selector('ul.primary li a[href$="sign_in"]');
    this.profileNav = Selector('ul.primary li a[href^="/profile/"]');
  }

  async navigateToLoginPage() {
    await t.click(this.signInNav);
    return new DistillerSignInPage();
  }

  async navigateToProfile() {
    await t.click(this.profileNav);
    return new DistillerProfilePage();
  }
}