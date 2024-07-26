import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET(request: NextRequest) {
    const email = request.headers.get('email');

    if (!email) {
        return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    try {
        await dbConnect();
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ success: true, audios: user.audios });
        } else {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
