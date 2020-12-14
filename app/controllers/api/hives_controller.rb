class Api::HivesController < ApplicationController
    def index
        @hives = Hive.includes(:users).all
        render :index
    end

    def show
        @hive = selected_hive
        # @messages = @chatroom.messages.order(created_at: :desc).limit(100).reverse
        # @hive_user = current_user.hive_users.find_by(chatroom_id: @chatroom.id)
        render :show
    end

    # def create
    #     @hive = Hive.new(hive_params)
    #     if @hive.save
    #         render json: HiveSerializer.new(@hive).serialized_json
    #     else
    #         render json: { error: 'Unable to create channel'}
    #     end
    # end

    # def update
    #     @user = selected_user
    #     if @user.try(:update_attributes, user_params)
    #         render :show
    #     elsif !@user
    #         render json: ["User credentials could not be found. Please try again."], stats: 400
    #     else
    #         render json: @user.errors.full_messages, status: 422
    #     end
    # end

    # def destroy
    #     @user = selected_user
    #     if @user
    #         @user.destroy
    #         render :show
    #     else
    #         render ['User could not be located.']
    #     end
    # end


    private

    def selected_hive
        Hive.find(params[:id])
    end

    def hive_params
        params.require(:hive).permit(:name, :description, :private, :ref_link)
    end
end
