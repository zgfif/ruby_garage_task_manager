# frozen_string_literal: true

class Task < ApplicationRecord
  before_create :set_priority

  after_destroy :recalculate_priority

  enum status: %i[undone done]

  validates :name, presence: true, length: { minimum: 3 }

  belongs_to :project

  private

  def set_priority
    self.priority = self.project.tasks.count + 1
  end

  def recalculate_priority
     priority = self.priority
     lower_priority_tasks = self.project.tasks.where("priority > #{priority}")

     lower_priority_tasks.each do |task|
       task.update(priority: task.priority - 1)
     end

     # p lower_priority_tasks
  end
end
