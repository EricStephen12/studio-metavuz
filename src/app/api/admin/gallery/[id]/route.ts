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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!await verifyAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    
    // Extract filename from ID (format: img_index_filename)
    const parts = id.split('_');
    if (parts.length < 3) {
      return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 });
    }
    
    const filename = parts.slice(2).join('_');
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    // Find the actual file (since we might have timestamp prefixes)
    const files = fs.readdirSync(imagesDir);
    const targetFile = files.find(file => file.includes(filename) || file === filename);
    
    if (!targetFile) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    const filepath = path.join(imagesDir, targetFile);
    
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return NextResponse.json({ message: 'Image deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!await verifyAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { alt } = await request.json();

    // For now, we'll just return success since we're not storing metadata in files
    // In a real implementation, you'd store this in a database
    return NextResponse.json({ 
      message: 'Image updated successfully',
      id,
      alt 
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}