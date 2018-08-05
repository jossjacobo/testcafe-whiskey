import ABCBasePage from "./ABCBasePage";
import { t } from "testcafe";

export default class ABCHomePage extends ABCBasePage {
  constructor() {
    super();
  }
  async navigateHome() {
    await t.navigateTo('https://www.abc.virginia.gov/');
    return this;
  }
}