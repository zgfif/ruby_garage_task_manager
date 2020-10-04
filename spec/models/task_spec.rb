# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Task, type: :model do
  let!(:user) { create(:user) }
  let!(:project) { create(:project, user: user) }

  context 'no project' do
    it 'should be invalid without related project' do
      task = build(:task, name: 'eat ice cream')
      expect(task).to_not be_valid
    end
  end

  context 'task attributes' do
    it 'should be invalid without name' do
      task = build(:task, project: project, name: '')
      expect(task).to_not be_valid
    end

    it 'should be invalid with too name less than 3 symbols' do
      task = build(:task, project: project, name: 'my')
      expect(task).to_not be_valid
    end

    it 'should be valid' do
      task = build(:task, project: project)
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

  context 'priorities' do
    let!(:first_task) { create(:task, project: project) }

    it 'should has the priority equal to 1' do
      expect(first_task.priority).to eq(1)
    end

    it 'should increase priority to 2' do
      second_task = create(:task, project: project)
      expect(second_task.priority).to eq(2)
    end

    it 'should be recalculated after destroying a task' do
      second_task = create(:task, project: project)
      first_task.destroy
      last_task = project.tasks.last

      expect(last_task.name).to eq(second_task.name)
      expect(last_task.priority).to eq(1)
    end
  end
end
