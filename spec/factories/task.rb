# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name { 'my task' }
    status { 0 }
    deadline { '31-09-2020' }
    priority { 0 }
    project
  end
end
