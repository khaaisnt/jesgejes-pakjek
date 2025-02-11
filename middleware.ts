import { NextRequest, NextResponse } from "next/server";
import { verifyKaryawan } from "./helper/authorization";

export const middleware = async (request: NextRequest) => {
  /** ambil data token dari cookie */
  if (request.nextUrl.pathname.startsWith("/karyawan")) {
    const token = request.cookies.get("token")?.value
    /** redirect to login */
    const redirectLogin = request.nextUrl.clone();
    redirectLogin.pathname = "/" // url halaman login

    if (typeof token === "undefined") {
      return NextResponse.redirect(redirectLogin)
    }

    const isVerifiedToken = await verifyKaryawan(token ?? "")
    if (!isVerifiedToken) {
      return NextResponse.redirect(redirectLogin)
    }
    return NextResponse.next()
  }
  return NextResponse.next()
}

/** menentukan route mana saja yang akan memberlakukan proses middleware */
export const config = {
    matcher: [
        "/karyawan/:path*"
    ]
}