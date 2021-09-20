const express = require('express');
const app = express();
const helmet = require("helmet");
const PORT = process.env.PORT || 8000;
require('isomorphic-fetch');
app.use(helmet());

//This section is all about getting user info from github,gitlab and gitbasket
//Getting all the user info looking at his username from github/gitlab/bitbucket
app.get('/get-user/:name', async (req,resp) => {
    let infoArr = [];
    let userName = req.params.name;
    
        //Getting user info from github
    const gitHubUser = await fetch("https://api.github.com/users/" + userName);
    let gitHubUserObj = await gitHubUser.json();
    //Adding info to array
    infoArr.push(gitHubUserObj);

    //Getting user info  gitlab
    const gitLabUser = await fetch("https://gitlab.com/api/v4/users?username=" + userName);
    const gitLabUserObj = await gitLabUser.json();
    if (gitLabUserObj.length === 0) {
        infoArr.push(gitLabUserObj);
    }else {
        const gitLabUserInfo = await fetch("https://gitlab.com/api/v4/users/" + gitLabUserObj[0].id);
        const gitLabUserInfoObj = await gitLabUserInfo.json();
        // Adding info to array
        infoArr.push(gitLabUserInfoObj);
    }
    
    //Getting userInfo from bitbucket
    const gitBucketUser = await fetch("https://api.bitbucket.org/2.0/repositories/" + userName);
    const gitBucketUserObj = await gitBucketUser.json();
     // If user does not exist give error
    if (gitBucketUserObj.type === "error") {
        // Pushing a custom response
        infoArr.push({"type": "Error", "reason": "Username not found on this system"});
    // If user does exist
    } else {
        if (gitBucketUserObj.values.length === 0) {
            infoArr.push({"type": "Error", "reason": "Account is private"});
        }else{
             //Using uuid to get the user full account
            const gitBucketUserID = await fetch("https://api.bitbucket.org/2.0/users/" + gitBucketUserObj.values[0].owner.uuid);
            const gitBucketUserIDObj = await gitBucketUserID.json();
            // Response is added to the array
            infoArr.push(gitBucketUserIDObj);
        }
    }
      // array with user info is sent back to my react app
    resp.send(infoArr);
})

//This section is about getting user repo information
// Get Github user repo info
app.get('/user/github/repo/:name', async (req,resp) => {
    let repoArr = [] ;
    let repoObj ;
    let userName = req.params.name ;
    
     //Geting the user last 5 repos from his account
    const gitHubRepo = await fetch("http://api.github.com/users/" + userName + "/gitHubRepo?per_page=" + 5 + "&sort=create");
    let gitHubRepoObj = await gitHubRepo.json();
    repoObj = gitHubRepoObj;
    
    // The first loop gets the repo gitHubCommits details for a repo
    for (let index = 0; index < repoObj.length; index++) {
        let gitHubRepogitHubCommits = await fetch("https://api.github.com/repos/"+ userName + "/" + repoObj[index].name + "/commits?per_page=5")
        let gitHubCommits = await gitHubRepogitHubCommits.json();

        // Create object that will store details
        var gitHubRepoInfoObj = new Object();
        gitHubRepoInfoObj.repoName = repoObj[index].name;
        gitHubRepoInfoObj.repoDesc = repoObj[index].description;
        gitHubRepoInfoObj.createdOn = (repoObj[index].created_at).substr(0, 10);
        gitHubRepoInfoObj.commitMsg = [];

       //For loop that will that run through prevoius commit mesg and adding mesg to the objects
        for (let index2 = 0; index2 < gitHubCommits.length; index2++) {
            gitHubRepoInfoObj.commitMsg.push(gitHubCommits[index2].commit.message);
        }     
        // This object is stored in our array
        repoArr.push(gitHubRepoInfoObj);
    }
    // repoArr sent back to react app
    resp.send(repoArr);
})

//Get gitlab repo
app.get('/user/gitlab/repo/:name', async (req,resp) => {
    let repoArr = [];
    let repoObj;
    let userName = req.params.name;

    //Geting the user last 5 repos from his account
    const gitLabRepo = await fetch("https://gitlab.com/api/v4/users/" + userName + "/projects?per_page=" + 5);
    let gitLabRepoObj = await gitLabRepo.json();
    repoObj = gitLabRepoObj;
    
    // The first loop gets the repo gitlabCommits details for a repo
    for (let index = 0; index < repoObj.length; index++) {
        let gitLabRepoCommits = await fetch("https://gitlab.com/api/v4/projects/" + repoObj[index].id + "/repository/commits?per_page=5")
        let gitlabCommits = await gitLabRepoCommits.json();

        // Create object that will store details
        var gitLabRepoInfoObj = new Object();
        gitLabRepoInfoObj.repoName = repoObj[index].name;
        gitLabRepoInfoObj.repoDesc = repoObj[index].description;
        gitLabRepoInfoObj.createdOn = (repoObj[index].created_at).substr(0, 10);
        gitLabRepoInfoObj.commitMsg = [];
        
        //For loop that will that run through prevoius commit mesg and adding mesg to the objects
        for (let index2 = 0; index2 < gitlabCommits.length; index2++) {
            gitLabRepoInfoObj.commitMsg.push(gitlabCommits[index2].title);
        }   
        // This object is stored in our array
        repoArr.push(gitLabRepoInfoObj);
    }
    // repoArr sent back to react app
    resp.send(repoArr);
})

//Get gitbucket repo
app.get('/user/bitbucket/repo/:name', async (req,resp) => {
    let repoArr = [];
    let repoObj;
    let userName = req.params.name;

    //Geting the user last 5 repos from his account
    const gitbucketRepo = await fetch("https://api.bitbucket.org/2.0/repositories/" + userName + "?pagelen=" + 5 + "&sort=-created_on");
    let gitbucketRepoObj = await gitbucketRepo.json();
    repoObj = gitbucketRepoObj;

    // The first loop gets the repo gitbucketCommits details for a repo
    for (let index = 0; index < repoObj.values.length; index++) {
        let gitbucketRepoCommits = await fetch(repoObj.values[index].links.gitbucketCommits.href + "?pagelen=" + 5);
        let gitbucketCommits = await gitbucketRepoCommits.json();

         // Create object that will store details
        var gitbucketRepoInfoObj = new Object();
        gitbucketRepoInfoObj.repoName = repoObj.values[index].name;
        gitbucketRepoInfoObj.createdOn = (repoObj.values[index].created_on).substr(0, 10);
        gitbucketRepoInfoObj.commitMsg = [];
        
        //For loop that will that run through prevoius commit mesg and adding mesg to the objects
        for (let index2 = 0; index2 < gitbucketCommits.values.length; index2++) {
            gitbucketRepoInfoObj.commitMsg.push(gitbucketCommits.values[index2].rendered.message.raw);
        }   
        // This object is stored in our array
        repoArr.push(gitbucketRepoInfoObj);
    }
    // repoArr sent back to react app
    resp.send(repoArr);
})
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
})