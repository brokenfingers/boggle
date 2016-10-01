class AddInitialTables < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.integer :num_of_columns, null: false, default: 4
      t.integer :num_of_rows, null: false, default: 4
    end

    create_table :nodes do |t|
      t.references :board
      t.string :value, null: false
    end

    create_table :edges do |t|
      t.integer :from_node_id, null: false
      t.integer :to_node_id, null: false
    end

    add_index :nodes, :board_id

    # Need to add index to the edge
  end
end
