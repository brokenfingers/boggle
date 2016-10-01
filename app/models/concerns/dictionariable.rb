module Dictionariable
  WORDS = Rails.configuration.dictionary.freeze

  # Assuming the file used to populate the dictionary is always sorted alphabetically
  def is_word_in_dictionary?(word)
    word = word.downcase

    binary_search(word) > -1
  end

  # Use a binary_search instead of Enumerable#include?
  def binary_search(word)
    lo = 0
    hi = WORDS.length - 1

    while lo <= hi do
      mid = lo + (hi - lo)/2

      if word < WORDS[mid]
        hi -= 1
      elsif word > WORDS[mid]
        lo += 1
      else
        return mid
      end
    end

    # If not found
    return -1
  end
end
