## Boggle

### Requirements

- PostgreSQL
- Rails
- npm

### Setup

#### Rails

1. Run `bundle install`
2. Run `rake db:create` to create a database for the application
3. Run `rake db:migrate` to run the migrations

(Optional) Run `rake db:seed` to create a couple of boards

(Optional) Run `rake data:create_table[PATH_TO_FILE,NUM_OF_ROWS,NUM_OF_COLS]` PATH_TO_FILE is the relative path from root

#### NPM

1. Run `npm install`
2. Run `node_modules/.bin/webpack --config ./config/webpack/development.config.js` to bundle assets

### Run

After following the steps above run `rails s` and go to `localhost:3000/` on your browser
