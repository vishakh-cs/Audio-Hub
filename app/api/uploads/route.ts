import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import dbConnect from '@/lib/mongodb'
import User from '@/lib/models/User'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
    console.log('API route hit'); 
    const data = await request.formData()
    console.log('Form data received');

    for (const [key, value] of data.entries()) {
      console.log(`FormData key: ${key}, value: ${value}`);
  }

    const file: File | null = data.get('file') as unknown as File
    const email: string = data.get('email') as string

    if (!file || !email) {
        console.log('File or email missing'); 
        return NextResponse.json({ success: false, message: 'Missing file or email' })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    try {
        console.log('Connecting to database'); 
        await dbConnect()
        console.log('Database connected'); 

        console.log('Uploading to Cloudinary'); 
        // Upload the file to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error); 
                        return reject(new Error(`Cloudinary upload failed: ${error.message}`))
                    }
                    console.log('Cloudinary result:', result) 
                    resolve(result)
                }
            ).end(buffer)
        })

        const audioUrl = result?.secure_url
        console.log('Audio URL:', audioUrl) 
        const user = await User.findOne({ email })
        console.log('User found:', user);

        if (user) {
            user.audios.push({ url: audioUrl, title: file.name })
            await user.save()
            console.log('User updated with audio URL'); 
        } else {
            console.log('User not found'); 
            return NextResponse.json({ success: false, message: 'User not found' })
        }

        return NextResponse.json({ success: true, audioUrl })
    } catch (error) {
        console.error('Error occurred:', error) 
        return NextResponse.json({ success: false, message: error.message })
    }
}
