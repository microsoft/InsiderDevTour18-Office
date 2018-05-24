# Office 365 Demos
## Prerequisites
Developing Apps for Microsoft Teams requires preparation for both the Office 365 Tenant and the development workstation.
For the Office 365 Tenant, the setup steps are detailed on the [Getting Started](https://msdn.microsoft.com/en-us/microsoft-teams/setup) page. Note that while the Getting Started page indicates that the Public Developer Preview is optional, this lab includes steps that not possible unless the Preview is enabled.

## Install Developer Tools
The developer workstation requires the following tools for this lab.
### Install NodeJS & NPM
Install [NodeJS](https://nodejs.org/) Long Term Support (LTS) version.
- If you have NodeJS already installed please check you have the latest version using `node -v`. It should return the current [LTS version](https://nodejs.org/en/download/). If your version is earlier than the latest LTS version, the easiest way to upgrade is to re-download and run the installer from that site.
- Allowing the Node setup program to update the computer PATH during setup will make the console-based tasks in this easier to accomplish.
After installing node, make sure npm is up to date by running following command:
```
npm install -g npm
```
### Install Yeoman and Gulp
[Yeoman](http://yeoman.io/) helps you kick-start new projects, and prescribes best practices and tools to help you stay productive. This lab uses a Yeoman generator for Microsoft Teams to quickly create a working, JavaScript-based solution.
Enter the following command to install Yeoman and Gulp:
```
npm install -g yo gulp
```

### Install Yeoman Teams Generator
The Yeoman Teams generator helps you quickly create a Microsoft Teams solution project with boilerplate code and a project structure & tools to rapidly create and test your app.
Enter the following command to install the Yeoman Teams Generator:
```
npm install generator-teams@preview -g
```

### Download ngrok
As Microsoft Teams is an entirely cloud-based product, it requires all services it accesses to be available from the cloud using HTTPS endpoints. Therefore, to enable the exercises to work within Teams, a tunneling application is required.
This lab uses [ngrok](https://ngrok.com/) for tunneling publicly-available HTTPS endpoints to a web server running locally on the developer workstation. ngrok is a single-file download that is run from a console.

### Code Editors
Tabs in Microsoft Teams are HTML pages hosted in an IFrame. The pages can reference CSS and JavaScript like any web page in a browser.

Microsoft Teams supports much of the common [Bot Framework](https://dev.botframework.com/) functionality. The Bot Framework provides an SDK for C# and Node. 

You can use any code editor or IDE that supports these technologies, however the steps and code samples in this training use [Visual Studio Code](https://code.visualstudio.com/) for Tabs using HTML/JavaScript and [Visual Studio 2017](https://www.visualstudio.com/) for Bots using the C# SDK.

### Bot Template for Visual Studio 2017
Download and install the Bot Application template zip from the direct download [link](http://aka.ms/bf-bc-vstemplate). Save the zip file to your Visual Studio 2017 templates directory which is traditionally located in `%USERPROFILE%\Documents\Visual Studio 2017\Templates\ProjectTemplates\`

![image1](https://github.com/Microsoft/InsiderDevTour18-Office/blob/master/img/1.png  "")

## Demo 1: Create and test a basic Teams app using Yeoman
This exercise introduces the Yeoman generator and its capabilities for scaffolding a project and testing its functionality. In this exercise, you will create a basic Teams app.

1.	Open a **Command Prompt** window.
2.	Change to the directory where you will create the tab.

> **Note:** Directory paths can become quite long after node modules are imported. **We suggest you use a directory name without spaces in it and create it in the root folder of your drive.** This will make working with the solution easier in the future and protect you from potential issues associated with long file paths. In this example, we use c:\Dev as the working directory.

1.	Type `md teams-app1` and press Enter.
2.	Type `cd teams-app1` and press Enter.

### Run the Yeoman Teams Generator

1.	Type `yo teams` and press Enter.

![image2](https://github.com/Microsoft/InsiderDevTour18-Office/blob/master/img/2.png  "")

2.	When prompted:

   * Accept the default **teams-app-1** as your solution name and press Enter.
   * Select **Use the current folder** for where to place the files and press Enter.
   
3.	The next set of prompts asks for specific information about your Teams App:

   * Accept the default **teams app1** as the name of your Microsoft Teams App project and press Enter.
   * Enter your name and press Enter.
   * Enter `https://tbd.ngrok.io` as the URL where you will host this tab and press Enter. (We will change this URL later.)
   * Accept the default selection of Tab for what you want to add to your project and press Enter.
   * Accept the default **teams app1 Tab** as the default tab name and press Enter.
   
![image3](https://github.com/Microsoft/InsiderDevTour18-Office/blob/master/img/3.png  "Yeoman Tab")  

> **Note:** At this point, Yeoman will install the required dependencies and scaffold the solution files along with the basic tab. This might take a few minutes. When the scaffold is complete, you should see the following message indicating success.

![image4](https://github.com/Microsoft/InsiderDevTour18-Office/blob/master/img/4.png  "")

### Run the ngrok secure tunnel application

1.	Open a new Command Prompt window.
2.	Change to the directory that contains the ngrok.exe application.
3.	Run the command `ngrok http 3007`
4.	The ngrok application will fill the entire prompt window. Make note of the Forwarding address using https. This address is required in the next step.
5.	Minimize the ngrok Command Prompt window. It is no longer referenced in this exercise, but it must remain running.

![image5](https://github.com/Microsoft/InsiderDevTour18-Office/blob/master/img/5.png  "")

### Update the Teams app manifest and create package
When the solution was generated, we used a placeholder URL. Now that the tunnel is running, we need to use the actual URL that is routed to our computer.

1.	Return to the first Command Prompt window in which the generator was run.
2.	Launch Visual Studio Code by running the command `code`

![image6](https://github.com/Microsoft/InsiderDevTour18-Office/blob/master/img/6.png  "")

3.	Open the manifest.json file in the manifest folder.
4.	Replace all instances of **tbd.ngrok.io** with the HTTPS Forwarding address from the ngrok window. (In this example, the forwarding address is `https://0f3b4f62.ngrok.io`). There are 6 URLs that need to be changed.
5.	Save the manifest.json file.
6.	In the Command Prompt window, run the command `gulp manifest`. This command will create the package as a zip file in the package folder

![image7](https://github.com/Microsoft/InsiderDevTour18-Office/blob/master/img/7.png  "")




# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
