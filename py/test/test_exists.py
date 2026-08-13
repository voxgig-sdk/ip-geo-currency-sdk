# IpGeoCurrency SDK exists test

import pytest
from ipgeocurrency_sdk import IpGeoCurrencySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IpGeoCurrencySDK.test(None, None)
        assert testsdk is not None
