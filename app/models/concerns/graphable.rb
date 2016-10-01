module Graphable
  extend ActiveSupport::Concern

  # Customized DFS to find a specified path
  def dfs(starting_node, char_list)
    nodes_to_visit = []
    visited_nodes = []

    nodes_to_visit.push(starting_node)

    while nodes_to_visit.present? do

      node = nodes_to_visit.pop
      visited_nodes.push(node)

      found = false
      node.adjacent_nodes.includes(:adjacent_nodes).each do |adjacent_node|

        if adjacent_node.value == char_list.first || adjacent_node.value == '*'
          nodes_to_visit.push(adjacent_node) unless visited_nodes.include?(adjacent_node) || nodes_to_visit.include?(adjacent_node)
          found = true
        end
      end

      if found
        char_list = Array.new(char_list)
        char_list.shift
      end
    end

    visited_nodes
  end

  private

  def graph
    @graph ||= nodes.each_slice(num_of_columns).to_a
  end

  # Node can changed to be polymorphic association to allow association of any type of Graph like models
  def create_nodes
    values.each do |value|
      Node.create(board_id: id, value: value)
    end
  end

  def is_top_most_row?(index)
    index == 0
  end

  def is_bottom_most_row?(index)
    index == num_of_rows - 1
  end

  def is_right_most_column?(index)
    index == num_of_columns - 1
  end

  def is_left_most_column?(index)
    index == 0
  end

  # TODO: Try to reduce complexity
  def create_edges
    num_of_rows.times do |row_index|
      num_of_columns.times do |col_index|
        node = graph[row_index][col_index]

        if is_top_most_row?(row_index)
          if is_left_most_column?(col_index)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index].id)
          elsif is_right_most_column?(col_index)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index].id)
          else
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index + 1].id)
          end
        elsif is_bottom_most_row?(row_index)
          if is_left_most_column?(col_index)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index].id)
          elsif is_right_most_column?(col_index)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index].id)
          else
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index + 1].id)
          end
        else
          if is_left_most_column?(col_index)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index].id)
          elsif is_right_most_column?(col_index)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index].id)
          else
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index - 1][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: graph[row_index + 1][col_index + 1].id)
          end
        end
      end
    end
  end

end
