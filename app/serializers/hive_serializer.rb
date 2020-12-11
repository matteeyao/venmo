# == Schema Information
#
# Table name: hives
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :text             not null
#  is_private  :boolean          not null
#  author_id   :integer          not null
#  ref_link    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class HiveSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
end
