class AddArtistToTracks < ActiveRecord::Migration[7.0]
  def change
    add_column :tracks, :artist, :string
  end
end
