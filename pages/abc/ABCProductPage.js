import ABCBasePage from "./ABCBasePage";
import { Selector, t } from "testcafe";

export default class ABCProductPage extends ABCBasePage {
  constructor() {
    super();
    this.name = Selector('.abc-title-bar h1');
    this.image = Selector('.abc-product-card .img-container img');
    this.price = Selector('.pricing .price');
    this.product = Selector('.pricing .ng-binding');
    this.description = Selector('.abc-product-card .description-text');
    this.moreStores = Selector('.abc-product-card .more-stores');
    this.inventory = Selector('#no-more-tables table tr td[data-title="Inventory"]');
    this.phone = Selector('#no-more-tables table tr td[data-title="Phone"]');
    this.productSize = Selector('select.product-sizes');
    this.productSizeOptions = this.productSize.find('option');
  }

  async selectSizeIfAvailable() {
    const sizeOptionsCount = await this.productSizeOptions.count;
    await t.click(this.productSize)
      .click(this.productSizeOptions.nth(sizeOptionsCount - 1));
    return this;
  }

  async searchAllStoresInventory(expectedWhiskey) {
    const actualWhiskey = await this.name.textContent;
    let results = []
    for (const store of this.storeList) {
      try {
        const storeInfo = await this.selectMyStoreAndGrabInfo(store);
        results.push({
          storeInfo,
          results: await this.getInventoryForStore(store)
        });
      } catch (error) {
        console.log(`Could not find ${expectedWhiskey} on store ${store.id}, skipping...`);
      }
    }

    // Filter out store with no inventory of the searched whiskey
    results = results.filter(storeResult => {
      let inventory = storeResult.results.inventoryCount;
      if (inventory) {
        if (Number.isInteger(inventory)) {
          return inventory > 0;
        } else {
          // Assume it's a string
          return inventory.replace(/\D+/g, '') > 0;
        }
      }
      return false;
    });
    return {
      searchedWhiskey: expectedWhiskey,
      foundWhiskey: actualWhiskey,
      results
    };
  }

  async getInventoryForStore(store) {
    let inventoryCount = 0;
    let phone;
    let inventoryExist = await this.existsAsync(this.inventory);
    if (inventoryExist) {
      inventoryCount = await this.inventory().textContent;
      phone = await this.phone().textContent;
    }
    return {
      storeId: store.id,
      inventoryCount,
      phone
    };
  }

  async existsAsync(selector) {
    try {
      await selector();
      return true;
    } catch (error) {
      return false;
    }
  }
}