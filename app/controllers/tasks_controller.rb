# frozen_string_literal: true

class TasksController < ApplicationController
  def index
    render json: project.tasks.order(priority: :asc), status: :ok
  end

  def create
    @task = project.tasks.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :conflict
    end
  end

  def update
    if task.update(task_params)
      render json: task, status: :ok
    else
      render json: task.errors, status: :conflict
    end
  end

  def destroy
    if task.destroy
      render json: task, status: :no_content
    else
      render json: task.errors, status: :accepted
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :priority, :status, :deadline)
  end

  def task
    @task ||= project.tasks.find(params[:id])
  end

  def project
    @project ||= current_user.projects.find(params[:project_id])
  end
end
