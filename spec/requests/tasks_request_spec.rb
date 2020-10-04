# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks', type: :request do
  let!(:user) { create(:user) }
  let!(:project) { create(:project, user: user) }
  let!(:tasks) { create_list(:task, 3, project: project) }
  let!(:too_short) { 'is too short (minimum is 3 characters)' }
  let(:no_blank) { "can't be blank" }

  before(:each) do
    allow_any_instance_of(TasksController)
      .to receive(:current_user).and_return(user)
    allow_any_instance_of(TasksController)
      .to receive(:authenticate_request).and_return(user)
  end

  context 'receive all tasks' do
    let!(:second_user) { create(:user) }
    let!(:second_project) { create(:project, user: second_user) }
    let!(:first_task) { create(:task, project: second_project) }

    it 'should return only related to current user tasks' do
      get "/projects/#{project.id}/tasks"

      ids = response_body.map { |el| el['id'] }
      tasks_ids = tasks.map(&:id)

      expect(ids).to_not include(first_task.id)
      expect(ids).to eq(tasks_ids)
    end

    it 'should return 3 tasks' do
      get "/projects/#{project.id}/tasks"
      # validates the order of tasks
      expect(response_body[0]['id']).to eq(tasks.first.id)
      expect(response_body[1]['id']).to eq(tasks.second.id)
      expect(response_body[2]['id']).to eq(tasks.third.id)

      expect(response_body.count).to eq(3)
      expect(response.status).to eq(200)
    end
  end

  context 'create task' do
    it 'should create task' do
      task_params = { task: { name: 'easy task' } }
      post "/projects/#{project.id}/tasks", params: task_params

      expect(response_body['name']).to eq('easy task')
      expect(response.status).to eq(201)
    end

    context 'should NOT create task' do
      it 'not enough symbols' do
        post "/projects/#{project.id}/tasks", params: { task: { name: 'ea' } }

        expect(response_body['name'][0]).to eq(too_short)
        expect(response.status).to eq(409)
      end

      it 'not enough symbols and can not be blank' do
        post "/projects/#{project.id}/tasks", params: { task: { name: '' } }

        expect(response_body['name']).to eq([no_blank, too_short])
        expect(response.status).to eq(409)
      end
    end
  end

  context 'update task' do
    it 'should update task' do
      t_params = { task: { name: 'altered' } }
      patch "/projects/#{project.id}/tasks/#{Task.first.id}", params: t_params

      expect(response_body['name']).to eq('altered')
      expect(response.status).to eq(200)
    end

    it 'should NOT update task' do
      t_params = { task: { name: 'al' } }
      patch "/projects/#{project.id}/tasks/#{Task.first.id}", params: t_params

      expect(response_body['name'][0]).to eq(too_short)
      expect(response.status).to eq(409)
    end
  end

  context 'destroy task' do
    it 'should destroy existing task' do
      delete "/projects/#{project.id}/tasks/#{Task.last.id}"

      expect(Task.count).to eq(2)
      expect(response.status).to eq(204)
    end

    it 'should NOT destroy existing task' do
      delete "/projects/#{project.id}/tasks/invalid_id"

      expect(Task.count).to eq(3)
      expect(response.status).to eq(202)
    end
  end
end
