class ProjectsController < ApplicationController
  before_action :project_params, only: :create

  def index
      @projects = present_user.projects
      render json: @projects, status: :ok
  end

  def create
    @project = present_user.projects.new(project_params)

    if @project.save
      render json: @project, status: :created
    else
      render json: @project.errors, status: :conflict
    end
  end

  def destroy
    @project = present_user.projects.find(params[:id])

    if @project.destroy
      render json: @project, status: :no_content
    else
      render json: @project.errors , status: :accepted
    end
  end

  private

   def project_params
     params.require(:project).permit(:name)
   end
end
