require 'rails_helper'

RSpec.describe 'Projects', type: :request do
  let!(:project) { create(:project) }

  it 'should return all related to first user projects' do
    get '/projects'

    responsed_project = response_body[0]
    expect(project.id).to eq(responsed_project['id'])
    expect(response.status).to eq(200)
  end


  it 'should create a new project' do
    new_project_hash = { project: { name: 'Second Project' } }
    post '/projects', params: new_project_hash

    expect(response_body['name']).to eq('Second Project')
    expect(response.status).to eq(201)
  end

  it 'should NOT create a new project' do
    new_project_hash = { project: { name: 'f' } }
    post '/projects', params: new_project_hash

    expect(response_body['name'][0]).to eq('is too short (minimum is 3 characters)')
    expect(response.status).to eq(409)
  end

  it 'should update existing project' do
    update_project_hash = { project: { name: 'altered Project' } }
    patch "/projects/#{project.id}", params: update_project_hash

    expect(response_body['name']).to eq('altered Project')
    expect(response.status).to eq(200)
  end

  it 'should NOT create a new project' do
    update_project_hash = { project: { name: 'f' } }
    patch "/projects/#{project.id}", params: update_project_hash

    expect(response_body['name'][0]).to eq('is too short (minimum is 3 characters)')
    expect(response.status).to eq(409)
  end


  it 'should destroy existing project' do
    delete "/projects/#{project.id}"

    expect(Project.count).to eq(0)
    expect(response.status).to eq(204)
  end

  it 'should NOT destroy existing project' do
    delete "/projects/invalid_id"

    expect(Project.count).to eq(1)
    expect(response.status).to eq(202)
  end
end
