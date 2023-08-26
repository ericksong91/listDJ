class CreateSetlists < ActiveRecord::Migration[7.0]
  def change
    create_table :setlists do |t|
      t.string :name
      t.integer :length
      t.string :genre
      t.integer :avg_bpm
      t.integer :user_id

      t.timestamps
    end
  end
end
