# pls donate utils
Utilities to go with my [PLS DONATE script](https://github.com/tzechco/roblox-scripts/tree/main/PLS%20DONATE)

## Features
- Transfer Robux from your alts to your main account (Requires your main account to have a [T-Shirt](https://www.roblox.com/develop?View=2) on sale)
- Gets the total amount of Robux in your accounts
- Set up gamepasses for new accounts to save you a lot of time


## How to use?
1. Download the repo either using `git clone` or [this link](https://github.com/tzechco/pls-donate-utils/archive/refs/heads/main.zip)
2. Extract the files if necessary
3. Run the file `run.bat` (you will have to run it once or twice for everything to install)
4. Add tokens


## What are tokens?
Tokens (or cookies) are what is used by the Roblox website to store your session data. The token allows you to login to Roblox without a password.

There are multiple ways to retrive your token.
#### Method 1: Roblox Account Manager (Automatic)
1. Copy the path where Roblox Account Manager is located
2. Run `run.bat` and select **token management** 
3. Select **import from roblox account manager**
4. Paste the path to Roblox Account Manager

#### Method 2: EditThisCookie Extension
1. Install [EditThisCookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg) for Google Chrome or Chromium based browsers.
2. Go to the [Roblox website](https://www.roblox.com) and login if needed
3. Activate the EditThisCookie extension
4. Find **.ROBLOSECURITY** and copy its value
5. Run `run.bat` and select token management then select add
6. Paste your token with quotation marks around it (" ")

#### Method 3: Roblox Account Manager (Manual)
1. Install [Roblox Account Manager](https://github.com/ic3w0lf22/Roblox-Account-Manager)
2. Click **Add Account** and login to Roblox
3. Open the settings menu and in the Developer tab toggle Enable Developer Mode
4. Relaunch Roblox Account Manager
5. Right click your user and select **Copy Security Token**
6. Run `run.bat` and select token management then select add
7. Paste your token with quotation marks around it (" ")
