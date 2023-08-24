class RemoveAlbumFromTracks < ActiveRecord::Migration[7.0]
  def change
    remove_column :tracks, :album
  end
end
