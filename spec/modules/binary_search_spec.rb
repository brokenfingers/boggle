require 'rails_helper'
include BinarySearch

describe BinarySearch do
  describe '#binary_search' do
    let (:array) { [1,2,3,4,5,6,7,8] }

    it 'should return the correct index for the values' do
      array.each_with_index do |value, index|
        expect(binary_search(array, value)).to eq index
      end
    end

    it 'should return -1 if value is nil' do
      expect(binary_search(array, nil)).to eq -1
    end

    it 'should return -1 if value is not found' do
      expect(binary_search(array, 0)).to eq -1
    end
  end
end
