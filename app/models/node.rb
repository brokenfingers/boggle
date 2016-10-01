class Node < ActiveRecord::Base
  serialize :values

  belongs_to :board

  has_many :edges, foreign_key: :from_node_id
  has_many :adjacent_nodes, through: :edges, source: :to_node
end
