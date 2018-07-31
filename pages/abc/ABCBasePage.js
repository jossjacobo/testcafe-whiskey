import { Selector, t } from "testcafe";

class Store {
  constructor(id) {
    this.id = `${id}`;
    this.firstResultMakeThisMyStoreButton = Selector(`#store-search-modal-make-this-my-store-${id}`)
    this.addressSelector = Selector('#my-store .address');
    this.phoneSelector = Selector(`#store-search-modal-store-${id} .phone`);
  }
}

export default class ABCBasePage {
  constructor() {
    this.searchBar = Selector('#global-search-bar input');
    this.selectStoreButton = Selector('#my-store')
    this.selectStoreSearchBar = Selector('#store-search-modal input');
    this.selectStoreSubmitButton = Selector('.abc-search-bar a[data-qe-id="store-search-modal-btn"]');
    this.storeList = process.env.ABC_STORE_LIST.split(',')
      .map(storeId => new Store(storeId));
  }

  async selectMyStoreAndGrabInfo(store) {
    await t.click(this.selectStoreButton)
      .typeText(this.selectStoreSearchBar, store.id, { replace: true })
      .click(this.selectStoreSubmitButton);

    let phone = await store.phoneSelector.textContent;
    await t.click(store.firstResultMakeThisMyStoreButton);
    let address = await store.addressSelector.textContent;

    return {
      storeId: store.id,
      address: address.trim(),
      phone: phone.trim()
    };
  }

  async search(whiskey) {
    // selector can't find the search box....
    await t
      .typeText(this.searchBar, whiskey)
      .pressKey('enter');
  }

  getUrl() {
    return this.url;
  }

  getStores() {
    return this.storeList;
  }

}