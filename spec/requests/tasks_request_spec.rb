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
      .to receive(:authenticate_request).and_return(user)
  end

  context 'receive all tasks' do
    it 'should return 3 tasks' do
      get "/projects/#{project.id}/tasks"

      expect(response_body.count).to eq(3)
      expect(response.status).to eq(200)
    end
  end

  context 'create task' do
    it 'should create task' do
      post "/projects/#{project.id}/tasks", params: { task: { name: 'easy task' } }

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
      patch "/projects/#{project.id}/tasks/#{Task.first.id}", params: { task: { name: 'altered' } }

      expect(response_body['name']).to eq('altered')
      expect(response.status).to eq(200)
    end

    it 'should NOT update task' do
      patch "/projects/#{project.id}/tasks/#{Task.first.id}", params: { task: { name: 'al' } }

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
