# Board consists of nodes that build a cyclic, and undirected graphs with possibly duplicate node values
class Board < ActiveRecord::Base
  include Dictionariable

  has_many :nodes

  # Comma separated string with board dices values or array
  attr_accessor :values

  before_save :validate_board_settings, if: :new_record? # Validate only on new record?
  after_create :create_nodes
  after_create :create_edges

  def is_word_present?(word)
    return false if word.length > num_of_columns * num_of_rows

    char_list = word.split('')

    starting_nodes = nodes.where(value: %W(#{char_list.shift} *)).includes(:adjacent_nodes)

    # DFS should return visited nodes
    # Using that check if word is present
    starting_nodes.each do |node|
      visited_nodes = dfs(node, Array.new(char_list))

      return true if word_found?(visited_nodes, word)
    end
    false
  end

  def word_found?(nodes, word)
    node_values = nodes.map(&:value)
    wildcard_count = node_values.find_all { |char| char == '*' }.count

    word.split('').each do |char|
      if !node_values.include?(char)
        if wildcard_count < 0
          return false
        else
          wildcard_count -= 1
        end
      end
    end
    true
  end

  # TODO: Try to see if everything can be eager_loaded at once
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

  def is_word_valid?(word)
    is_word_in_dictionary?(word) && is_word_present?(word)
  end

  private

  def board_values
    @board_values ||= values.is_a?(Array) ? values : values.gsub(' ', '').split(',')
  end

  def board
    @board ||= nodes.each_slice(num_of_columns).to_a
  end

  def create_nodes
    board_values.each do |value|
      Node.create(board_id: id, value: value)
    end
  end

  # TODO: Try to reduce complexity
  def create_edges
    num_of_rows.times do |row_index|
      num_of_columns.times do |col_index|
        node = board[row_index][col_index]

        if row_index == 0 # Top most row
          if col_index == 0 # Left most column
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index].id)
          elsif col_index == num_of_columns - 1 # Right most column
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index].id)
          else
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index + 1].id)
          end
        elsif row_index == num_of_rows - 1 # Bottom most row
          if col_index == 0 # Left most column
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index].id)
          elsif col_index == num_of_columns - 1 # Right most column
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index].id)
          else
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index + 1].id)
          end
        else
          if col_index == 0 # Left most column
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index].id)
          elsif col_index == num_of_columns - 1 # Right most column
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index].id)
          else
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index - 1][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index + 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index - 1].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index].id)
            Edge.create(from_node_id: node.id, to_node_id: board[row_index + 1][col_index + 1].id)
          end
        end
      end
    end
  end

  def validate_board_settings
    return true if board_values.length == num_of_rows * num_of_columns
    errors.add(:base, 'The number of letters is not fit for the specified dimensions')
    false
  end
end
