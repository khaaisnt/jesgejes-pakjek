import Cookies from 'js-cookie'

export const storeCookie = (
    key: string, value: string
): void => {
    // menyimpan data ke cookie
    Cookies.set(key, value)
}

export const getCookie = (
    key: string
): string  => {
    // mengambil data dari cookie
    return Cookies.get(key) || ""
}

export const removeCookie = (
    key: string
): void => {
    // menghapus data dari cookie
    Cookies.remove(key)
}