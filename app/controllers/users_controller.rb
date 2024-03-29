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
            if check_update_params
                user = current_user
                user.skip_validations = true
                user.avatar.attach(user_avatar_params)
                user.save
                render json: user, status: :accepted
            else
                user = current_user
                user.update!(user_params)
                render json: user, status: :accepted
            end
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

    def check_update_params
        params.key?("avatar")
    end

    def user_params
        params.permit(:username, :password, :password_confirmation, :bio)
    end

    def user_avatar_params
        params.permit(:avatar)[:avatar]
    end
end
