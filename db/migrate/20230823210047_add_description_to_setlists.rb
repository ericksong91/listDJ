class AddDescriptionToSetlists < ActiveRecord::Migration[7.0]
  def change
    add_column :setlists, :description, :string
  end
end
