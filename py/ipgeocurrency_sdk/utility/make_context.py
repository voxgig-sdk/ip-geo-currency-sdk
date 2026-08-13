# IpGeoCurrency SDK utility: make_context

from ipgeocurrency_sdk.core.context import IpGeoCurrencyContext


def make_context_util(ctxmap, basectx):
    return IpGeoCurrencyContext(ctxmap, basectx)
