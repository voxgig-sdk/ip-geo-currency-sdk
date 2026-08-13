# IpGeoCurrency SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IpGeoCurrencyUtility.registrar = ->(u) {
  u.clean = IpGeoCurrencyUtilities::Clean
  u.done = IpGeoCurrencyUtilities::Done
  u.make_error = IpGeoCurrencyUtilities::MakeError
  u.feature_add = IpGeoCurrencyUtilities::FeatureAdd
  u.feature_hook = IpGeoCurrencyUtilities::FeatureHook
  u.feature_init = IpGeoCurrencyUtilities::FeatureInit
  u.fetcher = IpGeoCurrencyUtilities::Fetcher
  u.make_fetch_def = IpGeoCurrencyUtilities::MakeFetchDef
  u.make_context = IpGeoCurrencyUtilities::MakeContext
  u.make_options = IpGeoCurrencyUtilities::MakeOptions
  u.make_request = IpGeoCurrencyUtilities::MakeRequest
  u.make_response = IpGeoCurrencyUtilities::MakeResponse
  u.make_result = IpGeoCurrencyUtilities::MakeResult
  u.make_point = IpGeoCurrencyUtilities::MakePoint
  u.make_spec = IpGeoCurrencyUtilities::MakeSpec
  u.make_url = IpGeoCurrencyUtilities::MakeUrl
  u.param = IpGeoCurrencyUtilities::Param
  u.prepare_auth = IpGeoCurrencyUtilities::PrepareAuth
  u.prepare_body = IpGeoCurrencyUtilities::PrepareBody
  u.prepare_headers = IpGeoCurrencyUtilities::PrepareHeaders
  u.prepare_method = IpGeoCurrencyUtilities::PrepareMethod
  u.prepare_params = IpGeoCurrencyUtilities::PrepareParams
  u.prepare_path = IpGeoCurrencyUtilities::PreparePath
  u.prepare_query = IpGeoCurrencyUtilities::PrepareQuery
  u.graphql_body = IpGeoCurrencyUtilities::GraphqlBody
  u.graphql_errors = IpGeoCurrencyUtilities::GraphqlErrors
  u.result_basic = IpGeoCurrencyUtilities::ResultBasic
  u.result_body = IpGeoCurrencyUtilities::ResultBody
  u.result_headers = IpGeoCurrencyUtilities::ResultHeaders
  u.transform_request = IpGeoCurrencyUtilities::TransformRequest
  u.transform_response = IpGeoCurrencyUtilities::TransformResponse
}
