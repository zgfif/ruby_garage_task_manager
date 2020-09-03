# frozen_string_literal: true

class Task < ApplicationRecord
  validates :name, presence: true, length: { minimum: 3 }

  belongs_to :project
end
