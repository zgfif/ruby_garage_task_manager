# frozen_string_literal: true

class Project < ApplicationRecord
  validates :name, presence: true, length: { minimum: 3 }
end
