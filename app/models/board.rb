# Board consists of nodes that build a cyclic, and undirected graphs with possibly duplicate node values
class Board < ActiveRecord::Base
  include Dictionariable
  include Graphable

  serialize :values

  has_many :nodes

  before_save :format_values
  before_save :validate_board_settings, if: :new_record? # Validate only on new record?
  after_create :create_nodes
  after_create :create_edges

  class << self
    def find_by_random
      self.offset(rand(self.count)).limit(1).first
    end
  end

  def as_json_object
    as_json(
      only: [:id, :values, :num_of_rows, :num_of_columns],
      include: {
        nodes: {
          only: [:value],
          methods: [:adjacency_list]
        }
      }
    )
  end

  def is_word_present?(word)
    return false if word.length > max_number_of_letters

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

  def is_word_valid?(word)
    is_word_in_dictionary?(word) && is_word_present?(word)
  end

  private

  def max_number_of_letters
    num_of_rows * num_of_columns
  end

  def validate_board_settings
    return true if values.length == max_number_of_letters
    errors.add(:base, 'The number of letters is not fit for the specified dimensions')
    false
  end

  def format_values
    self.values = values.is_a?(Array) ? values : values.gsub(' ', '').split(',')
  end
end
