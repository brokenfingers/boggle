# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Initial Set of Boards

board_values = [
  {
    cols: 4,
    rows: 3,
    values: %w(A C E D L U G * E * H T)
  },
  {
    cols: 4,
    rows: 4,
    values: %w(T A P * E A K S O B R S S * X D)
  }
]

board_values.each do |board_hash|
  Board.create!(num_of_columns: board_hash[:cols], num_of_rows: board_hash[:rows], values: board_hash[:values])
end
