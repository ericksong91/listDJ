class SetlistWithTracksSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :length, :genre, :avg_bpm, :user_id, :date, :setlist_track_org

  def setlist_track_org
    object.setlist_tracks.sort_by {|s| s.track_order}
  end

  def date
    object.created_at.to_date
  end

  has_many :tracks
end
