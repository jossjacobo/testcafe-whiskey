import { Selector, t } from "testcafe";
import DistillerListPage from "./DistillerListPage";
import slugify from 'slugify';

export default class DistillerMyListsPage {

  constructor() {
    const list = slugify(process.env.DISTILLER_LIST, {
      lower: true
    });
    this.listName = Selector(`#profile-lists a[href$="${slugify(list)}"] span`);
  }

  async navigateToList() {
    await t.click(this.listName);
    return new DistillerListPage();
  }
}