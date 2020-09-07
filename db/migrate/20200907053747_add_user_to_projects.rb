class AddUserToProjects < ActiveRecord::Migration[6.0]
  def change
    add_reference :projects, :user, null: false, foreign_key: true, type: :uuid
  end
end
