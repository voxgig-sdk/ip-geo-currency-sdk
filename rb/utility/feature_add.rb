# IpGeoCurrency SDK utility: feature_add
module IpGeoCurrencyUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
