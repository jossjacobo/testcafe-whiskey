import env from 'dotenv';
env.config();

import slackNotify from 'slack-notify';
let slack;
if (process.env.SLACK_WEBHOOK_URL) {
  slack = slackNotify(process.env.SLACK_WEBHOOK_URL);
}

import DistillerHomePage from './pages/distiller/DistillerHomePage';
import ABCHomePage from './pages/abc/ABCHomePage';
import ABCSearchResultsPage from './pages/abc/ABCSearchResultsPage';
import util from 'util';

fixture('Whisk(e)y Hunting!')
  .page('https://distiller.com/')

test('Sign In to distiller and print wishlist', async t => {
  try {
    const whiskeyList = await new DistillerHomePage()
      .navigateToLoginPage()
      .then(signInPage => signInPage.signIn())
      .then(homePage => homePage.navigateToProfile())
      .then(profilePage => profilePage.navigateToMyLists())
      .then(myListsPage => myListsPage.navigateToList())
      .then(wishList => wishList.getWhiskeyNames())
      .catch(err => console.log(err));

    console.log(whiskeyList);
    if (process.env.SLACK_WEBHOOK_URL) {
      slack.send({
        icon_url: 'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-07-29/408349589526_501be22227b357239684_72.jpg',
        unfurl_links: 1,
        username: 'Whiskey Bot',
        text: `Searching for Distiller Whiskey List *${process.env.DISTILLER_LIST}*: \n \`\`\`${JSON.stringify(whiskeyList, null, 2)}\`\`\``
      });
    }

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
            phone: store.results.phone
            // address: store.storeInfo.address // TODO clean up address field
          });
        }
        return sorted;
      }, {});

      console.log(util.inspect(resultsSortedByStores, false, null));
      if (process.env.SLACK_WEBHOOK_URL) {
        slack.send({
          icon_url: 'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-07-29/408349589526_501be22227b357239684_72.jpg',
          unfurl_links: 1,
          username: 'Whiskey Bot',
          text: `Search results:\n\`\`\`${JSON.stringify(resultsSortedByStores, null, 2)}\`\`\``
        });
      }
    } else {
      console.log('No whisk(e)ys found on your list');
      if (process.env.SLACK_WEBHOOK_URL) {
        slack.send({
          icon_url: 'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-07-29/408349589526_501be22227b357239684_72.jpg',
          unfurl_links: 1,
          username: 'Whiskey Bot',
          text: 'No whiskeys found on your list'
        });
      }
    }
  } catch (error) {
    console.log(error);
    if (process.env.SLACK_WEBHOOK_URL) {
      slack.send({
        icon_url: 'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-07-29/408349589526_501be22227b357239684_72.jpg',
        unfurl_links: 1,
        username: 'Whiskey Bot',
        text: error
      });
    }
  }
});