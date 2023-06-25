class CreateTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :tracks do |t|
      t.string :name
      t.string :genre
      t.string :album
      t.integer :length
      t.integer :bpm
      t.string :key

      t.timestamps
    end
  end
end
