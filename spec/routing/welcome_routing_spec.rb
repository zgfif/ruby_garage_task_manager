# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'basic routing' do
  it 'should return welcome#index route as default' do
    expect(get: '/').to route_to(controller: 'welcome', action: 'index')
  end
end
