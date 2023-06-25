class CreateSetlistTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :setlist_tracks do |t|
      t.integer :setlist_id
      t.integer :track_id
      t.integer :track_order

      t.timestamps
    end
  end
end
