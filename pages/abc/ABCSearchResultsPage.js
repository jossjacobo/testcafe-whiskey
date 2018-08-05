import ABCBasePage from "./ABCBasePage";
import { Selector, t } from "testcafe";
import ABCProductPage from "./ABCProductPage";

export default class ABCSearchResultsPage extends ABCBasePage {
  constructor() {
    super();
    this.resultCotainer = Selector('.resultContainer .coveo-result-frame');
    this.firstResultLink = this.resultCotainer.find('a.CoveoResultLink');
    this.firstResultType = this.resultCotainer.find('.fa-tag');
  }

  async clickOnFirstResult() {
    await t.click(this.firstResultLink);
    return new ABCProductPage();
  }

  // Make sure first result exists and it's not a text file
  async hasResults() {
    try {
      await this.firstResultLink();
    } catch (error) {
    }
    const linkExists = await this.firstResultLink.exists;
    const productTypeExists = await this.firstResultType.exists;
    console.log({ linkExists, productTypeExists });
    return linkExists && productTypeExists;;
  }
}