type responceType<t> = {
    error: string
    success: boolean
    data: t
}

type defaultResponseType<t> = {
    message: string
    success: boolean
    data: t
}