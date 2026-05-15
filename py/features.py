# IpGeoCurrency SDK feature factory

from feature.base_feature import IpGeoCurrencyBaseFeature
from feature.test_feature import IpGeoCurrencyTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IpGeoCurrencyBaseFeature(),
        "test": lambda: IpGeoCurrencyTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
