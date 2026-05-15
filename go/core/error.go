package core

type IpGeoCurrencyError struct {
	IsIpGeoCurrencyError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewIpGeoCurrencyError(code string, msg string, ctx *Context) *IpGeoCurrencyError {
	return &IpGeoCurrencyError{
		IsIpGeoCurrencyError: true,
		Sdk:              "IpGeoCurrency",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *IpGeoCurrencyError) Error() string {
	return e.Msg
}
