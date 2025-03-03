import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    try {
        // Set a custom "role" cookie as "guest"
        const cookieStore = await cookies();

        // Get the "role" cookie
        const roleCookie = cookieStore.get("role");

        if (!roleCookie)
            return NextResponse.json({
                success: true,
                message: "Guest"
            });

        return NextResponse.json({
            success: true,
            message: roleCookie.value,
        });

    } catch (error) {
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
    }
}
