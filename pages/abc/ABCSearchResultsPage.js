import ABCBasePage from "./ABCBasePage";
import { Selector, t } from "testcafe";
import ABCProductPage from "./ABCProductPage";

export default class ABCSearchResultsPage extends ABCBasePage {
  constructor() {
    super();
    this.firstResult = Selector('.resultContainer a.CoveoResultLink');
  }

  async clickOnFirstResult() {
    await t.click(this.firstResult);
    return new ABCProductPage();
  }

  async hasResults() {
    return await this.firstResult.exists;
  }
}