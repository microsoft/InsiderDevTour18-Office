# Create Productive Apps with Office 365

## Prerequisites

Developing Apps for Microsoft Teams requires preparation for both the Office 365 Tenant and the development workstation.

Note you will need to get an Office 365 tenancy for working with Teams.  Please refer to the Office 365 tenant spreadsheet on the Insider Tour Teams site in the *General/Files/Session Content* folder. Each tour venue has its own tenant to avoid conflicts.

### Install Developer Tools

The developer workstation requires the following tools for this lab.

#### Install NodeJS & NPM

Install [NodeJS](https://nodejs.org/) Long Term Support (LTS) version.

- If you have NodeJS already installed please check you have the latest version using `node -v`. It should return the current [LTS version](https://nodejs.org/en/download/).
- Allowing the Node setup program to update the computer PATH during setup will make the console-based tasks in this easier to accomplish.

After installing node, make sure npm is up to date by running following command:

````shell
npm install -g npm
````

#### Install Yeoman and Gulp

[Yeoman](http://yeoman.io/) helps you kick-start new projects, and prescribes best practices and tools to help you stay productive. This lab uses a Yeoman generator for Microsoft Teams to quickly create a working, JavaScript-based solution.

Enter the following command to install Yeoman and gulp:

````shell
npm install -g yo gulp
````

#### Install Yeoman Teams Generator

The Yeoman Teams generator helps you quickly create a Microsoft Teams solution project with boilerplate code and a project structure & tools to rapidly create and test your app.

Enter the following command to install the Yeoman Teams generator:

````shell
npm install generator-teams@preview -g
````

#### Download ngrok

As Microsoft Teams is an entirely cloud-based product, it requires all services it accesses to be available from the cloud using HTTPS endpoints. Therefore, to enable the exercises to work within Teams, a tunneling application is required.

This lab uses [ngrok](https://ngrok.com) for tunneling publicly-available HTTPS endpoints to a web server running locally on the developer workstation. ngrok is a single-file download that is run from a console.

#### Code Editors

Tabs in Microsoft Teams are HTML pages hosted in an IFrame. The pages can reference CSS and JavaScript like any web page in a browser.

Microsoft Teams supports much of the common [Bot Framework](https://dev.botframework.com/) functionality. The Bot Framework provides an SDK for C# and Node.

You can use any code editor or IDE that supports these technologies, however the steps and code samples in this training use [Visual Studio Code](https://code.visualstudio.com/) for Tabs using HTML/JavaScript and [Visual Studio 2017](https://www.visualstudio.com/) for Bots using the C# SDK.

#### Bot Template for Visual Studio 2017

Download and install the Bot Application template zip from the direct download link [http://aka.ms/bf-bc-vstemplate](http://aka.ms/bf-bc-vstemplate). Save the zip file to your Visual Studio 2017 templates directory which is traditionally located in `%USERPROFILE%\Documents\Visual Studio 2017\Templates\ProjectTemplates\`

   ![Bot Template In Templates Directory](Images/BotTemplate.png)
   
### Teams Setup

1. Confirm sideloading apps is enabled in Teams. In a browser login into http://office.com with your Office Tenant and follow the instructions on this [page](https://docs.microsoft.com/en-us/microsoftteams/platform/get-started/get-started-tenant). You will need to **restart Teams** after changing any sideload settings.

   ![](Images/enableteamsandapps.png)
   
2. Make sure Teams is installed and login with your Office tenant account. 

3. Make sure the App Studio app is installed in Teams. If not use the Teams Store to find it and install. Once installed, open **App Studio** and click on the **Manifest editor** tab.

4. Create a new app. Fill out all of the required fields in the **App details** section. That is all we need for now. We will use this later on for the Teams bot demo.

   ![](Images/Exercise4-02.PNG)

<a name="exercise1"></a>

## Machine Pre-Demo Preparation:  Create and Test a Basic Teams App using Yeoman

**Note**: In this demo, we will set up a pre-prepared Teams tenancy so that users don't have to watch these files download.  We will also pre-add some authentication files to the project.

This exercise introduces the Yeoman generator and its capabilities for scaffolding a project and testing its functionality.
In this exercise, you will create a basic Teams app.

1. Open a **Command Prompt** window.
1. Change to the directory where you will create the tab.

  > **Note:** Directory paths can become quite long after node modules are imported.  **We suggest you use a directory name without spaces in it and create it in the root folder of your drive.**  This will make working with the solution easier in the future and protect you from potential issues associated with long file paths. In this example, we use `c:\Dev` as the working directory.

1. Type `md teams-app1` and press **Enter**.
1. Type `cd teams-app1` and press **Enter**.

### Run the Yeoman Teams Generator

1. Type `yo teams` and press **Enter**.

    ![](Images/Exercise1-01.png)

1. When prompted:
    1. Accept the default **teams-app-1** as your solution name and press **Enter**.
    1. Select **Use the current folder** for where to place the files and press **Enter**.
1. The next set of prompts asks for specific information about your Teams App:
    1. Accept the default **teams app1** as the name of your Microsoft Teams App project and press **Enter**.
    1. Enter your name and press **Enter**.
    1. Enter **https://tbd.ngrok.io** as the URL where you will host this tab and press **Enter**. (We will change this URL later.)
    1. Accept the default selection of **Tab** for what you want to add to your project and press **Enter**.
    1. Accept the default **teams app1 Tab** as the default tab name and press **Enter**.

      ![](Images/Exercise1-02.png)

  >**Note:** At this point, Yeoman will install the required dependencies and scaffold the solution files along with the basic tab. This might take a few minutes.
  > When the scaffold is complete, you should see the following message indicating success.
  >
  > ![](Images/Exercise1-03.png)


### Add the Microsoft Authentication Library (MSAL) to the project

Using **npm**, add the Microsoft Authentication library to the project.

1. Open a **Command Prompt** window.
1. Change to the directory containing the tab application.
1. Run the following command:

    ```shell
    npm install msal@0.1.1
    ```

### Pre-add the authentication helper files to the project.

1. Add a new file to the **web** folder named **auth.html**
    1. Add the following to the **auth.html** file.

        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Auth</title>
          <!-- inject:css -->
          <!-- endinject -->
        </head>
        <body>
          <script src="https://secure.aadcdn.microsoftonline-p.com/lib/0.1.1/js/msal.min.js"></script>
          <script src="https://statics.teams.microsoft.com/sdk/v1.0/js/MicrosoftTeams.min.js"></script>
          <!-- inject:js -->
          <!-- endinject -->
          <script type='text/javascript'>
            var auth = new teamsApp1.Auth();
            auth.performAuthV2();
          </script>
        </body>
        </html>
        ```
   > Note: If your app is not called **teams app1** you will need to replace **teamsApp1** in the `teamsApp1.Auth()` call for the code above.

1. Add a new file to the **scripts** folder named **auth.ts**

    1. Add the following to the **auth.ts** file. Note that there is a token named `[application-id-from-registration]` that must be replaced later during the actual demo. Use the value of the Application Id copied from the Application Registration page.

        ```typescript
        /**
        * Implementation of the teams app1 Auth page
        */
        /// <reference path="../../../node_modules/msal/out/msal.d.ts" />
        export class Auth {
          private token: string = "";
          private user: Msal.User;

          /**
          * Constructor for Tab that initializes the Microsoft Teams script
          */
          constructor() {
            microsoftTeams.initialize();
          }

          public performAuthV2(level: string) {
            // Setup auth parameters for MSAL
            let graphAPIScopes: string[] = ["https://graph.microsoft.com/user.read", "https://graph.microsoft.com/group.read.all"];
            let userAgentApplication = new Msal.UserAgentApplication(
                                                "[application-id-from-registration]",
                                                "https://login.microsoftonline.com/common",
                                                this.tokenReceivedCallback);

            if (userAgentApplication.isCallback(window.location.hash)) {
              userAgentApplication.handleAuthenticationResponse(
                window.location.hash,
                (token) => {
                  if (this.user == null) {
                    this.user = userAgentApplication.getUser()!;
                    this.getToken(userAgentApplication, graphAPIScopes);
                  } else {
                    microsoftTeams.authentication.notifySuccess(token);
                  }
                },
                (error) => { microsoftTeams.authentication.notifyFailure(error); }
              );
            } else {
              this.user = userAgentApplication.getUser();
              if (!this.user) {
                // If user is not signed in, then prompt user to sign in via loginRedirect.
                // This will redirect user to the Azure Active Directory v2 Endpoint
                userAgentApplication.loginRedirect(graphAPIScopes);
              } else {
                this.getToken(userAgentApplication, graphAPIScopes);
              }
            }
          }

          private getToken(userAgentApplication: Msal.UserAgentApplication, graphAPIScopes: string[]) {
            // In order to call the Graph API, an access token needs to be acquired.
            // Try to acquire the token used to query Graph API silently first:
            userAgentApplication.acquireTokenSilent(graphAPIScopes).then(
              (token) => {
                //After the access token is acquired, return to MS Teams, sending the acquired token
                microsoftTeams.authentication.notifySuccess(token);
              },
              (error) => {
                // If the acquireTokenSilent() method fails, then acquire the token interactively via acquireTokenRedirect().
                // In this case, the browser will redirect user back to the Azure Active Directory v2 Endpoint so the user
                // can reenter the current username/ password and/ or give consent to new permissions your application is requesting.
                if (error) {
                  userAgentApplication.acquireTokenRedirect(graphAPIScopes);
                }
              }
            );
          }

          private tokenReceivedCallback(errorDesc, token, error, tokenType) {
            //  suppress typescript compile errors
          }
        }
        ```

1. Locate the file **scripts/client.ts**
    1. Add the following line to the bottom of **scripts/client.ts**

      ```typescript
      export * from './auth';
      ```


## Excercise 1:  Create and Test a Basic Teams App using Yeoman

**Note**: you may want to show users the yeoman tool in a separate folder, but not let it run to completion since it can take a minute.  Start yeoman as you did in the pre-demo steps, but hit Ctrl-C to stop it and go to your prepared demo folder.

### Run the ngrok secure tunnel application

1. Open a new **Command Prompt** window.
1. Change to the directory that contains the ngrok.exe application.
1. run the command `ngrok http 3007`
1. The ngrok application will fill the entire prompt window. Make note of the Forwarding address using https. This address is required in the next step.
1. Minimize the ngrok Command Prompt window. It is no longer referenced in this exercise, but it must remain running.

![](Images/Exercise1-04.png)

### Update the Teams app manifest and create package

When the solution was generated, we used a placeholder URL. Now that the tunnel is running, we need to use the actual URL that is routed to our computer.

1. Return to the first **Command Prompt** window in which the generator was run.
1. Launch Visual Studio Code by running the command `code .`

    ![](Images/Exercise1-05.png)

1. Open the **manifest.json** file in the **manifest** folder.
1. Replace all instances of **tbd.ngrok.io** with the HTTPS Forwarding address from the ngrok window. (In this example, the forwarding address is **https://0f3b4f62.ngrok.io**.) There are 6 URLs that need to be changed.
1. Save the **manifest.json** file.
1. In the **Command Prompt** window, run the command `gulp manifest`. This command will create the package as a zip file in the **package** folder

    ![](Images/Exercise1-06.png)

1. Build the webpack and start the Express web server by running the following commands:

    ```shell
    gulp build
    gulp serve
    ```

    ![](Images/Exercise1-07.png)

    > Note: The gulp serve process must be running in order to see the tab in the Teams application. When the process is no longer needed, press `CTRL+C` to cancel the server.

### Sideload app into Microsoft Teams

1. In the Microsoft Teams application, click the **Create and join team** link. Then click the **Create team** button.

    ![](Images/Exercise1-08.png)

1. Enter a team name and description. In this example, the Team is named **teams-app-1**. Click **Next**.
1. Optionally, invite others from your organization to the team. This step can be skipped in this lab.
1. The new team is shown. In the left-side panel, click the ellipses next to the team name. Choose **Manage team** from the context menu.

    ![](Images/Exercise1-09.png)

1. On the Manage team display, click **Apps** in the tab strip. Then click the **Upload a custom app** link at the bottom right corner of the application. (If you don't have this link check the sideload settings in the [Getting Started article](https://msdn.microsoft.com/en-us/microsoft-teams/setup).)

    ![](Images/Exercise1-10.png)

1. Select the **teams-app-1.zip** file from the **package** folder. Click **Open**.

    ![](Images/Exercise1-11.png)

1. The app is displayed. Notice information about the app from the manifest (Description and Icon) is displayed.

    ![](Images/Exercise1-12.png)

The app is now sideloaded into the Microsoft Teams application and the Tab is available in the **Tab Gallery**.

### Add Tab to Team view

1. Tabs are not automatically displayed for the Team. To add the tab, click on the **General** channel in the Team.
1. Click the **+** icon at the end of the tab strip.
1. In the Tab gallery, sideloaded tabs are displayed in the **Tabs for your team** section. Tabs in this section are arranged alphabetically. Select the tab created in this lab.

    ![](Images/Exercise1-13.png)

1. The generator creates a configurable tab. When the Tab is added to the Team, the configuration page is displayed. Enter any value in the **Setting** box and click **Save**.

    ![](Images/Exercise1-14.png)

1. The value entered will then be displayed in the Tab window.

    ![](Images/Exercise1-15.png)

This concludes Exercise 1A.


<a name="exercise3"></a>
## Exercise 1B: Call Microsoft Graph inside a Tab

This section of the lab will extend the tab created in Exercise 1 to call the Microsoft Graph. The Exercise contains many code files. The **solutions** folder contains files that contain the code and are provided to facilitate copy/paste of the code rather than typing.


### Register an application in AAD

To enable an application to call the Microsoft Graph, an application registration is required. This lab uses the [Azure Active Directory v2.0 endpoint](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-compare).

1. Open a browser to the url **https://apps.dev.microsoft.com**
1. Log in with a Work or School account.
1. Click **Add an app**
1. Complete the **Register your application** section, entering an Application name and Contact email. Clear the checkbox for Guided Setup. Click **Create**

    ![](Images/Exercise3-01.png)

1. On the registration page, in the **Platforms** section, click **Add Platform**.

    ![](Images/Exercise3-02.png)

1. In the **Add Platform** dialog, click **Web**.
1. Using the hostname from ngrok, enter a **Redirect URL** to the auth.html file.

    ```
    https://[replace-this].ngrok.io/auth.html
    ```

1. Click the **Add URL** button.

    ![](Images/Exercise3-03.png)

1. Click **Save**.
1. Make note of the Application Id. This value is used in the authentication / token code.


### Content Page and Authentication

With the tab configured, the content page can now render information as selected.  Perform the following to update the Tab content.

These steps assume that the application created in Exercise 1 is named **teams-app-1**. Furthermore, paths listed in this section are relative to the `src/app/` folder in the generated application.

1. Open the file **web/teamsApp1TabTab.html**. Just before the `</body>` element add the following code snippet.

      ```html
      <div>
       <div id="graph"></div>
      </div>
      ```

1. Open the file **scripts/teamsApp1TabTab.ts**.
    1. Add the following refresh() method above the componentWillMount() method.

        ```typescript
       public refresh() {
           let graphElement = document.getElementById("graph");
           graphElement!.innerText = "Loading profile...";

           microsoftTeams.authentication.authenticate({
               url: "/auth.html",
               width: 700,
               height: 500,
               successCallback: (data) => {

                 let graphEndpoint = "https://graph.microsoft.com/v1.0/me";

                 var req = new XMLHttpRequest();
                 req.open("GET", graphEndpoint, false);
                 req.setRequestHeader("Authorization", "Bearer " + data);
                 req.setRequestHeader("Accept", "application/json;odata.metadata=minimal;");
                 req.send();

                 var result = JSON.parse(req.responseText);

                 document.getElementById("graph")!.innerHTML = `<table><tr><td>Name</td><td>${result.displayName}<//td></tr><tr><td>Job</td><td>${result.jobTitle}<//td></tr><tr><td>Location</td><td>${result.officeLocation}<//td></tr></table>`;
               },
               failureCallback: function (err) {
                 document.getElementById("graph")!.innerHTML = "Failed to authenticate and get token.<br/>" + err;
               }
             });
         }
        ```

    1. Locate the `PrimaryButton` tag. Replace the tag with the following code snippet. This will call the refresh method above when clicked and kick off the Graph authorization flow.

        ```
        <PrimaryButton onClick={ this.refresh }>Refresh</PrimaryButton>
        ```
1. Switch over to the **auth.ts** file and locate the `performAuthV2` method. Copy your application ID you registered earlier and replace `[PASTE YOUR APP ID FROM APPS.DEV.MICROSOFT.COM HERE]` with it as shown below.

   ```typescript
    public performAuthV2(level: string) {
      // Setup auth parameters for MSAL
      let graphAPIScopes: string[] = ["https://graph.microsoft.com/user.read", "https://graph.microsoft.com/group.read.all"];
      let userAgentApplication = new Msal.UserAgentApplication(
                                          "[PASTE YOUR APP ID FROM APPS.DEV.MICROSOFT.COM HERE]",
                                          "https://login.microsoftonline.com/common",
                                          this.tokenReceivedCallback);

   ```

1. Save all of your file changes. With `gulp serve` still running your changes should automatically be served out. Refresh the Tab in Microsoft Teams. Click the **Refresh** button to invoke the authentication and call to graph.microsoft.com.

1. Login with your Office tenant when prompted and grant permission for the tab to access the account's Graph information. You should now see the tenant's name, position, and location get displayed.


This concludes Exercise 1B.

<a name="exercise2"></a>

## Exercise 2: Create and test a basic Teams Bot using Visual Studio

This section of the lab introduces the Bot Framework template and its capabilities for scaffolding a project and testing its functionality. In this exercise, you will create a basic Teams bot.

1. Launch Visual Studio 2017 as an administrator
1. In Visual Studio 2017, select **File | New | Project**
1. Create a new Visual C# project using the **Bot Application Template**

   ![](Images/Exercise2-01.png)

1. Build the solution to download all configured NuGet packages.

1. Right-click on the project in Solution Explorer and select **Manage Nuget Packages**. Update all the packages, ensuring that the **Microsoft.Bot.Builder** is at least version 3.12. Repeat until all the packages are up-to-date.

The Bot Application template is a fully functional Echo Bot that takes the user's text utterance as input and returns it as output. In order to run the bot inside Microsoft Teams:

- The bot must be accessible from the internet
- The bot must be registered with the Bot Connector
- The AppId and AppPassword from the Bot Framework registration page have to be recorded in the project's web.config
- The bot must be added to Microsoft Teams

Before registering the bot, note the URL configured for the solution in Visual Studio.

1. In Solution Explorer, double-click on **Properties**.
1. In the **Properties** designer, select the **Web** tab.
1. Note the **Project URL**.

    ![](Images/Exercise2-02.png)

### Run the ngrok secure tunnel application

1. Open a new **Command Prompt** window.
1. Download ngrok (https://ngrok.com/download) and unzip the ngrok secure tunnel application. Change to the directory that contains the ngrok.exe application.
1. Run the command `ngrok http [port] -host-header=localhost:[port]` *(Replace [port] with the port portion of the URL noted above.)*
1. The ngrok application will fill the entire prompt window. Make note of the Forwarding address using https. This address is required in the next step.
1. Minimize the ngrok Command Prompt window. It is no longer referenced in this lab, but it must remain running.

  ![](Images/Exercise2-03.png)

### Register the bot

![](Images/important.png)

> **Note:** The process of Bot registration changed effective March 31, 2018. The process below will still work but there will be a warning message about a required migration to Azure. Once you add the Teams channel to the bot then this requirement will change to a recommendation. To reduce churn to this session we are leaving the flow as-is. For more information you can read this page [here](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-quickstart-registration?view=azure-bot-service-3.0). For more info on registering through Azure please read [Register a bot with Bot Service](https://docs.microsoft.com/en-us/bot-framework/bot-service-quickstart-registration).

1. Go to the Microsoft Bot Framework portal at https://dev.botframework.com/bots/new and sign in. (The bot registration portal accepts a Work or School Account or a Microsoft Account.)
1. Click **Create a bot or skill**. (If the Create button is not shown, click **My bots** in the top navigation.)
1. Complete the Bot profile section, entering a Display name, unique Bot handle and description.

    ![](Images/Exercise2-04.png)

1. Complete the Configuration section.
    1. For the Messaging endpoint, use the Forwarding https address from ngrok with /api/messages appended to provide the route to the MessagesController in the Visual Studio project. In the example, this is `https://a2632edd.ngrok.io/api/messages`
    1. Click the **Create Microsoft App ID and password button**. This opens a new browser tab/window.
    1. In the new browser tab/window the application is registered in Azure Active Directory. Click **Generate an app password to continue**.
    1. An app password is generated. Copy the password and save it. You will use it in a subsequent step.
    1. Click **OK**. This closes the popup.
    1. Click the **Finish and go back to Bot Framework** button. This closes the new browser tab/window and populates the app Id in the **Paste your app ID below to continue textbox**.

        ![](Images/Exercise2-05.png)

1. Scroll to the bottom of the page. Agree to the Privacy statement, Terms of use, and Code of conduct and click the **Register** button. Once the Bot is created, click **OK** to dismiss the pop-up.

    > The **Connect to channels** page is displayed for the newly-created bot. The bot must be connected to Microsoft Teams.

1. Click the **Teams** logo.

    ![](Images/Exercise2-06.png)

1. Once the connection is complete, ensure the connection is Enabled and click **Done**

    ![](Images/Exercise2-07.png)

The bot registration is complete.

> Clicking on Settings in the top navigation will re-display the profile and configuration sections. This can be used to update the Messaging endpoint in the event ngrok is stopped, or the bot is moved to staging/production.

### Configure the web project

The bot project must be configured with information from the registration.

1. In Visual Studio, open the **Web.config** file. Locate the `<appSettings>` section.
1. Enter the `BotId` value. the `BotId` is the **Bot handle** from the **Configuration** section of the registration.
1. Enter the `MicrosoftAppId`. The `MicrosoftAppId` is the app ID from the **Configuration** section of the registration.
1. Enter the `MicrosoftAppPassword`. The `MicrosoftAppPassword` is the auto-generated app password displayed in the pop-up during registration.

    > If you do not have the app password, the bot must be deleted and re-registered. An app password cannot be reset nor displayed.

### Test the bot using the portal

The Bot registration portal can be used to test the bot.

1. Ensure ngrok is still running, and the Messaging endpoint of the bot registration is using the hostname shown as the Forwarding https address in ngrok.
1. In Visual Studio, press **F5** to start the project.
1. Once the **default.htm** page is displayed, return to the [Bot registration portal](https://dev.botframework.com/bots).
1. Select your bot.
1. In the top-right corner of the page, click the **Test** button.
1. Enter a message and press **Enter**. The message is echoed back along with the length of the message.

    ![](Images/Exercise2-08.png)

    > If the message cannot be sent, there is an error in the configuration of the Bot registration, ngrok and Visual Studio. The request should be visible in the ngrok command window. For additional detail on the request in ngrok, open the address `http://localhost:4040`. If no requests are displayed in ngrok, then the Messaging endpoint has the wrong hostname, or there is a disruption in the network connectivity.

### Configure Visual Studio to Package bot

1. Within the Teams App Studio application, go to the app we created ahead of time at the beginning. Click on the **Manifest editor** tab and select the app you created. Click on **Bots** in the **Capabilities** section.

    ![](Images/Exercise4-03.PNG)
    
1. On the Bots pane, click the **Set up** button for an existing bot. Give the bot a name and paste in your bot app ID from the bot registration process we did earlier.

    ![](Images/Exercise4-04.PNG)
    
1. Now select **Test and distribute**. Click the **Export** button to save the packaged zip filename to the *Downloads* folder on your machine. We will use this zip file in the next step. 

    ![](Images/Exercise4-05.PNG)

### Sideload app into Microsoft Teams

Choose a Team to add the bot to. Like before when we added the tab app, navigate to the **Manage Team** pane for the Team.

1. On the Manage team display, click **Apps** in the tab strip. Then click the **Upload a custom app** link at the bottom right corner of the application.
1. Select the **teams-bot1.zip** file from the *Downloads* folder. Click **Open**. Your  zip file may be different based on what you called your Teams app.
1. The app is displayed. Notice information about the app from the manifest (Description and Icon) is displayed.

    ![](Images/Exercise2-13.png)

The app is now sideloaded into the Microsoft Teams application and the bot is available.

### Interact with the Bot

In the General channel for the team, a message is created announcing the bot has been added to the Team. To interact with the bot, @ mention the bot.

![](Images/Exercise2-14.png)

As you test the bot, you will notice that the character count is not correct. You can set breakpoints in the Visual Studio project to debug the code. (Remember, however, that the count was correct using the registration portal.) Later modules of this training will review how to remove mentions from the message.

This concludes Exercise 2.
