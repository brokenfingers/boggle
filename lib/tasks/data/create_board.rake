namespace :data do
  desc 'Task used to create new boards from an input file'

  task :create_board, [:board_layout, :num_of_rows, :num_of_cols] => [:environment] do |task, args|
    file_path = File.join(Rails.root, args[:board_layout].to_s)

    num_of_rows = args[:num_of_rows] ? args[:num_of_rows] : 4
    num_of_cols = args[:num_of_cols] ? args[:num_of_cols] : 4

    raise StandardError, 'Invalid File' unless File.file?(file_path)

    File.open(file_path).each do |line|
      Board.create!(values: line.chomp, num_of_rows: num_of_rows, num_of_columns: num_of_cols)
    end
  end
end
