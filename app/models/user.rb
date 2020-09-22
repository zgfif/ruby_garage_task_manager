# frozen_string_literal: true

class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true

  has_secure_password

  has_many :projects, dependent: :destroy

  has_many :tasks, through: :projects
end
