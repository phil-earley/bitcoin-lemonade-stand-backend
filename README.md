## Bitcoin Lemonade Stand - Back-end w/Knex, DB, and GraphQL
Node, Express and GraphQL, PostgreSQL, & Knex running on Heroku.

The synopsis:
Knowing users can and will be calling the explore call with 1 or multiple different wallet addresses, we can safely use:
- Express + GraphQL fo create custom responses for particular addresses
- Capture the network calls and transactions to add them to a database when they return.
- Deploying a database solution to heroku (been struggling on this one) to run the code in a CORS-free setting (just adding &cors=true doesn't seem to quite apply, per their docs)
- Allows an easy mechanism for the front end to test all of it niceties and get the data that it needs.
# bitcoin-lemonade-stand-backend
