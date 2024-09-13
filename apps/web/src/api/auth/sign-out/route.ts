import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/auth/sign/in'

    return NextResponse.redirect(redirectUrl)
}