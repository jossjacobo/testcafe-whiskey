import env from 'dotenv';
env.config();

import DistillerHomePage from './pages/distiller/DistillerHomePage';
import ABCHomePage from './pages/abc/ABCHomePage';
import ABCSearchResultsPage from './pages/abc/ABCSearchResultsPage';
import util from 'util';

fixture('Whisk(e)y Hunting!')
  .page('https://distiller.com/')

test('Sign In to distiller and print wishlist', async t => {
  const whiskeyList = await new DistillerHomePage()
    .navigateToLoginPage()
    .then(signInPage => signInPage.signIn())
    .then(homePage => homePage.navigateToProfile())
    .then(profilePage => profilePage.navigateToMyLists())
    .then(myListsPage => myListsPage.navigateToList())
    .then(wishList => wishList.getWhiskeyNames())
    .catch(err => console.log(err));
  console.log(whiskeyList);

  if (whiskeyList.length > 0) {
    await t.navigateTo('https://www.abc.virginia.gov/');
    let results = [];
    for (const whiskey of whiskeyList) {
      await new ABCHomePage().search(whiskey);
      const resultsPage = new ABCSearchResultsPage();
      if (resultsPage.hasResults()) {
        await resultsPage.clickOnFirstResult()
          .then(productPage => productPage.selectSizeIfAvailable())
          .then(productPage => productPage.searchAllStoresInventory(whiskey))
          .then(res => results.push(res))
          .catch(err => console.log(err));
      }
    }

    // Reduce the results array to sort them by store and not by whiskey
    const resultsSortedByStores = results.reduce((sorted, whiskey) => {
      for (const store of whiskey.results) {
        sorted[`${store.storeInfo.storeId}`] = [];
        sorted[store.storeInfo.storeId].push({
          searched: whiskey.searchedWhiskey,
          found: whiskey.foundWhiskey,
          inventory: store.results.inventoryCount,
          phone: store.results.phone,
          address: store.storeInfo.address
        });
      }
      return sorted;
    }, {});
    console.log(util.inspect(resultsSortedByStores, false, null))
  } else {
    console.log('No whisk(e)ys found on your list');
  }
});