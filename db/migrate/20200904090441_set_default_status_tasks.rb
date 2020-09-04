class SetDefaultStatusTasks < ActiveRecord::Migration[6.0]
  def change
    change_column_default :tasks, :status, 0
  end
end
