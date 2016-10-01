class Board < ActiveRecord::Base
  has_many :nodes

  # Comma separated string with board dices values
  attr_accessor :values

  before_save :validate_board_settings, if: :new_record? # Validate only on new record?
  after_create :create_nodes
  after_create :create_edges

  def is_word_present?(word)
    return false if word.length > num_of_columns * num_of_rows

    
  end

  def is_word_valid?(word)
    # Using the dictionary
    # Use binary search
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

  def create_edges
    num_of_rows.times do |row_index|
      num_of_columns.times do |col_index|
        node = board[row_index][col_index]

        if row_index == 0
          if col_index == 0 # Left most column
            Edge.create(from_node_id: node.id, to_node_id: board[row_index][col_index + 1].id)
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
        elsif row_index == num_of_rows - 1
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
