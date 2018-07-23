import { Selector, t } from "testcafe";
import DistillerMyListsPage from "./DistillerMyListsPage";

export default class DistillerProfilePage {

  constructor() {
    this.myLists = Selector('.profile-nav .menu ul li a').withText('MY LISTS');
  }

  async navigateToMyLists() {
    await t.click(this.myLists);
    return new DistillerMyListsPage();
  }

}