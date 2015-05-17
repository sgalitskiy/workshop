# CMFS DIO-Soft
description

## Getting started
1. Clone project with `GIT` to your workstation
2. Open console and run `npm` with
```  
npm install 
```
3. Start server with
```  
npm start 
```
4. Go to [localhost:3000](http://localhost:3000)

*azure process

## Configuration

For starting site configuration go to [login page](http://localhost:3000/login/) and enter admin login and password. After authorization you will be redirected to home page which will be updated with structure which allows you to change theme, update templates and configure navigation.

### Themes configuration
After authorization at the top of the screen you'll se current theme name and link call the popup which allows you to change theme, create new theme and delete any theme except `default`.
Theme name must contain only `letters` and `-`. It must be from 3 to 30 characters. 

### Menu configuration
After authorization near header and footer navigation will appear `Edit navigation` link, which call the popup and allows you to add new link, update current link title and url, change it position via drag-and-drop.
Currently we support 2 levels navigation. <br>
URL format - `folder/file-name`. Available only `letters` and `-`. If file doesn't exist - server will create it. If file name doesn't set, server will look for Base.html file in folder. 

### Pages CRUD
To create new page you just need to add this page via [Menu configuration](#menu-configuration) step.  <br>
To update page, click on `Edit` link under page content, make your changes and click on `save` link. 


### Email configuration
For sending Emails we are using `sendgrid` plugin. For render templates we are using `UnderscoreJS templates` functionality. All templates stored in `templates` folder. Credentials stored in `config.json` in `sendgrid` object, `siteFrom` and `sendTo` fields.
```javascript
{
    "sendgrid": {
        "user": "yourUserAccount@azure.com",
        "key": "yourAccountKey"
    },
    "siteFrom": "Site from title in mail", // 'New request from' will be added automatically at the beginning
    "sendTo": [
        "sendTo@example.com"
    ]
}
```