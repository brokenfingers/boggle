class Api::BoardsController < ApplicationController
  def index
    render json: Board.find_by_random.as_json_object, status: :ok
  end

  def verify_word
    valid_word = board.is_word_valid?(word)
    points = valid_word ? board.word_value(word) : 0

    render json: {
      points: points,
      valid: valid_word,
      word: word
    }, status: :ok
  end

  private

  def board
    @board ||= Board.find_by(id: params[:board_id])
  end

  def word
    @word ||= params[:word]
  end
end
