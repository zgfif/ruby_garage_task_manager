# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Task, type: :model do
  context 'no project' do
    it 'should be invalid without related project' do
      task = Task.new(name: 'my task', status: 0,  deadline: '2020-09-31',
                      priority: 1)
      expect(task).to_not be_valid
    end
  end

  context 'task attributes' do
    let(:task_attributes) { { status: 0, deadline: '2020-09-31', priority: 2 } }
    let(:project) { Project.create(name: 'Home work') }
    let(:task) { project.tasks.new(task_attributes) }

    it 'should be invalid without name' do
      task.name = ''
      expect(task).to_not be_valid
    end

    it 'should be invalid with too name less than 3 symbols' do
      task.name = 'my'
      expect(task).to_not be_valid
    end

    it 'should be valid' do
      task.name = 'first task'
      expect(task).to be_valid
    end
  end

  context 'task status' do
    it 'incorrect text status' do
      expect { subject.status = 'other' }
        .to raise_error(ArgumentError, "'other' is not a valid status")
    end

    it 'incorrect text status' do
      expect { subject.status = 2 }
        .to raise_error(ArgumentError, "'2' is not a valid status")
    end

    it 'correct text status' do
      expect { subject.status = 'done' }.to_not raise_error
    end

    it 'correct numeric status' do
      expect { subject.status = 1 }.to_not raise_error
    end

    it 'has correct default status' do
      expect(subject.status).to eq('undone')
    end
  end
end
