class Node < ActiveRecord::Base
  serialize :values

  belongs_to :board

  has_many :edges, foreign_key: :from_node_id
  has_many :adjacent_nodes, through: :edges, source: :to_node

  # Need a hook to use the correct ordinal when creating the row
  # validate that values.length is == board.num_of_columns

  # Need to update the adjacency_list if row is changed

end
