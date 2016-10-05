require 'rails_helper'

describe Dictionariable do
  let (:board) { Board.new }

  describe '#is_word_in_dictionary?' do
    it 'should return true if word is in dictionary' do
      expect(board.is_word_in_dictionary?('hello')).to eq true
    end

    it 'should return false if word is not in dictionary' do
      expect(board.is_word_in_dictionary?('helloaw')).to eq false
    end
  end
end
