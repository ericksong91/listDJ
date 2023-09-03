class UsersController < ApplicationController
    def index
        users = User.all.with_attached_avatar
        render json: users
    end

    def create
        @user = User.create!(user_params)
        login_user
        render json: @user, status: :created
    end

    def update
        if current_user
            # byebug
            user = current_user
            user.avatar.attach(user_avatar_params[:avatar])
            user.save(validate: false)
            render json: user, status: :accepted
        else
            render_not_authorized_response
        end
    end

    def show
        if current_user
            render json: current_user, status: :created
        else
            render_not_authorized_response
        end
    end

    def destroy
        if current_user
            current_user.destroy
            session.delete :user_id
            head :no_content
        else
            render_not_authorized_response
        end
    end

    private

    def render_not_authorized_response
        render json:  { "errors": "Not authorized" }, status: :unauthorized
    end

    def user_params
        params.permit(:username, :password, :password_confirmation, :bio)
    end

    def user_avatar_params
        params.permit(:avatar)
    end
end
