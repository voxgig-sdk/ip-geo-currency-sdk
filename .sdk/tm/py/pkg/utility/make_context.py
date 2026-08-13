# IpGeoCurrency SDK utility: make_context

from projectname_sdk.core.context import IpGeoCurrencyContext


def make_context_util(ctxmap, basectx):
    return IpGeoCurrencyContext(ctxmap, basectx)
