module BinarySearch
  def binary_search(array, value)
    lo = 0
    hi = array.length - 1

    while lo <= hi do
      mid = lo + (hi - lo)/2

      if value < array[mid]
        hi -= 1
      elsif value > array[mid]
        lo += 1
      else
        return mid
      end
    end

    # If not found
    return -1
  end
end
