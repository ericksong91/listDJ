class SessionsController < ApplicationController
    before_action :authorize, only: :destroy

    def create
        user = User.find_by(username: params[:username])

        if user&.authenticate(params[:password])
            login_user
            render json: user
        else
            render json: { errors: "Invalid username or password" }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

    private 

    def login_user
        session[:user_id] = user.id
    end

    def authorize
        render json: { errors: "Not authorized" }, status: :unauthorized unless session[:user_id]
    end


end
