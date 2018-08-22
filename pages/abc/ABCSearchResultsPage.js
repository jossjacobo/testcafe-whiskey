import ABCBasePage from "./ABCBasePage";
import { Selector, t } from "testcafe";
import ABCProductPage from "./ABCProductPage";

export default class ABCSearchResultsPage extends ABCBasePage {
  constructor() {
    super();
    this.firstResultContainer = Selector('.resultContainer .coveo-result-frame').nth(0);
    this.firstResultLink = this.firstResultContainer.find('a.CoveoResultLink');
    this.firstResultType = this.firstResultContainer.find('.fa-tag');
  }

  async clickOnFirstResult() {
    await t.click(this.firstResultLink);
    return new ABCProductPage();
  }

  // Make sure first result exists and it's not a text file
  async hasResults() {
    try {
      await this.firstResultContainer();
    } catch (error) {
      console.log(error);
    }
    const linkExists = await this.firstResultLink.exists;
    const productTypeExists = await this.firstResultType.exists;
    console.log({ linkExists, productTypeExists });
    return linkExists && productTypeExists;;
  }
}