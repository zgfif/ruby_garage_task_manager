# frozen_string_literal: true

class Project < ApplicationRecord
  validates :name, presence: true, length: { minimum: 3 }

  belongs_to :user

  has_many :tasks, dependent: :destroy
end
