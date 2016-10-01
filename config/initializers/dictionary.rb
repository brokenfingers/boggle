dic_path = File.join(Rails.root, 'public', 'dictionary.txt')

if File.exist?(dic_path)
  dic = []

  File.open(dic_path, 'r').each do |word|
    dic << word.chomp
  end

  Rails.configuration.dictionary = dic
else
  Rails.configuration.dictionary = []
end
