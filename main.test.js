import DistillerHomePage from './pages/DistillerHomePage';

fixture('Distiller Wishlist')
  .page('https://distiller.com/')

test('Sign In to distiller and print wishlist', async t => {
  const whiskeyList = await new DistillerHomePage()
    .navigateToLoginPage()
    .then(signInPage => signInPage.signIn())
    .then(homePage => homePage.navigateToProfile())
    .then(profilePage => profilePage.navigateToMyLists())
    .then(myListsPage => myListsPage.navigateToWishlist())
    .then(wishList => wishList.getWhiskeyNames());

  console.log(whiskeyList);
});