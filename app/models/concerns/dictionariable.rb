module Dictionariable
  include BinarySearch

  WORDS = Rails.configuration.dictionary.freeze

  # Assuming the file used to populate the dictionary is always sorted alphabetically
  def is_word_in_dictionary?(word)
    word = word.downcase

    binary_search(WORDS, word) > -1
  end
end
