class CreateTagsSetlists < ActiveRecord::Migration[7.0]
  def change
    create_table :tags_setlists do |t|
      t.integer :tag_id
      t.integer :setlist_id

      t.timestamps
    end
  end
end
