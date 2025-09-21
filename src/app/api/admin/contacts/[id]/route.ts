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

const CONTACTS_FILE = path.join(process.cwd(), 'data', 'contacts.json');

// Read contacts from file
function readContacts() {
  if (!fs.existsSync(CONTACTS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
}

// Write contacts to file
function writeContacts(contacts: any[]) {
  const dataDir = path.dirname(CONTACTS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
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
    const { read } = await request.json();

    const contacts = readContacts();
    const contactIndex = contacts.findIndex((contact: any) => contact.id === id);

    if (contactIndex === -1) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    contacts[contactIndex].read = read;
    writeContacts(contacts);

    return NextResponse.json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Contact update error:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
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

    const contacts = readContacts();
    const filteredContacts = contacts.filter((contact: any) => contact.id !== id);

    if (contacts.length === filteredContacts.length) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    writeContacts(filteredContacts);

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Contact delete error:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}