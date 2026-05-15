# IpGeoCurrency SDK utility: make_context

from core.context import IpGeoCurrencyContext


def make_context_util(ctxmap, basectx):
    return IpGeoCurrencyContext(ctxmap, basectx)
