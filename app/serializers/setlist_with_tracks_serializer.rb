class SetlistWithTracksSerializer < ActiveModel::Serializer
  attributes :id, :name, :length, :genre, :setlist_track_org

  def setlist_track_org
    object.setlist_tracks.sort_by {|s| s.track_order}
  end

  has_many :tracks
end
