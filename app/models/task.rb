# frozen_string_literal: true

class Task < ApplicationRecord
  enum status: %i[undone done]

  validates :name, presence: true, length: { minimum: 3 }

  belongs_to :project

  belongs_to :user
end
