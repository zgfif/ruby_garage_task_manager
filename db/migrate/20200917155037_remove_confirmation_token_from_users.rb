class RemoveConfirmationTokenFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :confirmation_token, :string
  end
end
