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
      .typeText(this.usernameField, `${process.env.DISTILLER_EMAIL}`)
      .typeText(this.passwordField, `${process.env.DISTILLER_PASSWORD}`)
      .click(this.submitButton);
    return new DistillerHomePage();
  }
}