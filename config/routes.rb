# frozen_string_literal: true

Rails.application.routes.draw do
  root 'welcome#index'

  post 'authenticate', to: 'authentication#authenticate'

  resources :projects do
    resources :tasks
  end
end
