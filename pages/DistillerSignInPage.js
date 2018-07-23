import { Selector, t } from 'testcafe';
import DistillerHomePage from './DistillerHomePage';

export default class DistillerSignInPage {
  constructor() {
    this.usernameField = Selector('#user_login');
    this.passwordField = Selector('#user_password');
    this.submitButton = Selector('input[type=submit]');
  }

  async signIn() {
    await t
      .typeText(this.usernameField, "jossjacobo@gmail.com")
      .typeText(this.passwordField, "963dG7he*II@o0%2")
      .click(this.submitButton);
    return new DistillerHomePage();
  }
}