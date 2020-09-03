class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks, id: :uuid do |t|
      t.string :name
      t.integer :priority
      t.integer :status
      t.references :project, null: false, foreign_key: true, type: :uuid
      t.datetime :deadline

      t.timestamps
    end
  end
end
