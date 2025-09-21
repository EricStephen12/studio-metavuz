import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

// Verify admin authentication
async function verifyAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

export async function GET() {
  try {
    if (!await verifyAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    const images = imageFiles.map((filename, index) => ({
      id: `img_${index}_${filename.replace(/\.[^/.]+$/, "")}`,
      src: `/images/${filename}`,
      alt: filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' '),
      filename
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}