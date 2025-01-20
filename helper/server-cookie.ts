/**
 * cookie: tempat penyimpanan pada broser
 * biasanya untuk menyimpan data user session
 */
import Cookies from "js-cookie"
import { cookies } from "next/headers"

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

export const getServersideCookie = async (
    key: string
): Promise<string> => {
    return (
        await cookies()).get(key)?.value || ""
}

export const removeCookie = (
    key: string
): void => {
    // menghapus data dari cookie
    Cookies.remove(key)
}