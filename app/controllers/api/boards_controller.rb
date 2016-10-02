class Api::BoardsController < ApplicationController
  def index
    # Send Board.find_by_random.as_json (as_json should send all nodes with its adjacency values)
    render json: Board.find_by_random.as_json_object, status: :ok
  end

  def verify_word
    if board.is_word_valid?(params[:word])

    else

    end
  end

  private

  def board
    @board ||= Board.find_by(id: params[:id])
  end
end
