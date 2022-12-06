const { Octokit } = require("@octokit/rest");
require('dotenv').config();

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const org = process.env.GITHUB_ORG;


async function run() {
    // https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
    var login = await octokit.rest.users.getAuthenticated();
    console.log("Hello, %s", login.data.name);
    console.log(`Fetching repos from ${org}`);
    // https://docs.github.com/en/rest/repos/repos#list-organization-repositories
    var repos = await octokit.rest.repos.listForOrg({org: org});
    console.log("Repos found...");
    repos.data.map(x => console.log(x.name));
}

run();