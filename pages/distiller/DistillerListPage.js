import { Selector, t } from "testcafe";

export default class DistillerListPage {

  constructor() {
    this.listItems = Selector('ul.profile-list a h3');
  }

  async getWhiskeyNames() {
    const whiskeys = [];
    const listCount = await this.listItems.count;
    for (let i = 0; i < listCount; i++) {
      const whiskey = await this.listItems.nth(i).textContent;
      whiskeys.push(whiskey);
    }
    return whiskeys;
  }
}