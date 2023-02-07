Hello!

Notes

- i have used Yarn, as this package manager easily resolves and updated package dependencies.
- Testing suite is not where i want, im a little rusty on older require import syntax and this led to issues with mocking with Jest. I could have installed babel to compile down the code however this would have been a big change.
- Also I need to revise how to test streams :?
- i started a TTL feature to try and optimize this heavy endpoint, its not quite finished it should handle when a file is not there and clean then data on start of the server.

Desicions:

- I used a stream to get the investment details, with the current data this is unecessary, however i think with larger data that i felt investments would be, this i feel would be the better approach.

- ideally the architecture of the services should work with an event bus so they can store the data they want as the other services develop, this will reduce API calls to eachother and make the service function quicker.

`yarn develop`
