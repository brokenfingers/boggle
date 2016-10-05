require 'rails_helper'

describe Board do
  let (:board) { FactoryGirl.create(:board, values: %w(A C E D L U G * E * H T)) }

  describe '#is_word_valid?' do
    it 'should return true if it is found in dictionary and the board' do
      expect(board.is_word_valid?('ace')).to eq true
    end

    it 'should return false if word length is less than 3' do
      expect(board.is_word_valid?('ac')).to eq false
    end

    it 'should return false if word is found on board but not in dictionary' do
      expect(board.is_word_valid?('aceds')).to eq false
    end
  end
end
