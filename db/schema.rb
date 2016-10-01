# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161001032807) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boards", force: :cascade do |t|
    t.integer "num_of_columns", default: 4, null: false
    t.integer "num_of_rows",    default: 4, null: false
  end

  create_table "edges", force: :cascade do |t|
    t.integer "from_node_id", null: false
    t.integer "to_node_id",   null: false
  end

  create_table "nodes", force: :cascade do |t|
    t.integer "board_id"
    t.string  "value",    null: false
  end

  add_index "nodes", ["board_id"], name: "index_nodes_on_board_id", using: :btree

end
