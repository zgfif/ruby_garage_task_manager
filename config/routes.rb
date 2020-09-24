# frozen_string_literal: true

Rails.application.routes.draw do
  root 'welcome#index'

  post 'signin', to: 'authentication#authenticate'
  post 'signup', to: 'authentication#signup'

  resources :projects do
    resources :tasks
  end
end
