# IpGeoCurrency SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IpGeoCurrencyFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpGeoCurrencyBaseFeature.new
    when "ratelimit"
      IpGeoCurrencyRatelimitFeature.new
    when "retry"
      IpGeoCurrencyRetryFeature.new
    when "test"
      IpGeoCurrencyTestFeature.new
    when "timeout"
      IpGeoCurrencyTimeoutFeature.new
    else
      IpGeoCurrencyBaseFeature.new
    end
  end
end
