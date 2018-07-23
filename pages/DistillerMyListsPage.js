import { Selector, t } from "testcafe";
import DistillerListPage from "./DistillerListPage";

export default class DistillerMyListsPage {

  constructor() {
    this.wishlist = Selector('.user-lists-index ul li a[href$="wishlist"] span');
  }

  async navigateToWishlist() {
    await t.click(this.wishlist);
    return new DistillerListPage();
  }
}