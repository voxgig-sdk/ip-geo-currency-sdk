# IpGeoCurrency SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IpGeoCurrencyFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpGeoCurrencyBaseFeature.new
    when "test"
      IpGeoCurrencyTestFeature.new
    else
      IpGeoCurrencyBaseFeature.new
    end
  end
end
