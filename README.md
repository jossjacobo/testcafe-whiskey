[![CircleCI](https://circleci.com/gh/jossjacobo/testcafe-whiskey.svg?style=svg)](https://circleci.com/gh/jossjacobo/testcafe-whiskey)
# Whisk(e)y Search Bot
The bot will log in to your Distiller account, navigate to the specified list, and search for the whisk(e)ys on the list in all the provided ABC stores (Virginia only). The bot will print out all the search results organized by store (or post them on slack if the webhook is provided). I have included a [CircleCI](https://circleci.com/gh/jossjacobo/workflows/testcafe-whiskey/tree/master) config as well that uses it's [scheduling workflow feature](https://circleci.com/docs/2.0/workflows/#scheduling-a-workflow) to run the search on a weekly or daily basis.

![Demo GIF](/38083972_1302463563242691_5791098636502827008_n.gif)

## Required
- [NodeJS](https://nodejs.org/en/)
- [Google Chrome](https://www.google.com/chrome/)

## Setup
`npm install`

## Create `.env` file
For the bot to run correctly you'll need all of the following fields:
- `DISTILLER_EMAIL` - Distiller email
- `DISTILLER_PASSWORD` - Distiller password
- `DISTILLER_LIST` - The name of the distiller list you want to search for
- `ABC_STORE_LIST` - The list of ABC stores (by store number) that you want to search in, you can grab the store number of all the store you want [here](https://www.abc.virginia.gov/stores#/search)
- `SLACK_WEBHOOK_URL` - (Optional) If this url is provided the results will also be posted to slack.

Sample `.env` file
```
DISTILLER_EMAIL=someemail@gmail.com
DISTILLER_PASSWORD=password
DISTILLER_LIST=wishlist
ABC_STORE_LIST=46,359
SLACK_WEBHOOK_URL=https://myaccountname.slack.com/services/hooks/incoming-webhook?token=myToken
```

## Running the bot
`npm test`

That's it, enjoy!
