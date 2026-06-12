import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'leads.json');

// Ensure data directory and leads.json exist
function ensureDb() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
}

export async function GET() {
  try {
    ensureDb();
    const data = fs.readFileSync(dbPath, 'utf8');
    const leads = JSON.parse(data);
    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    ensureDb();
    const body = await request.json();
    
    const newLead = {
      id: Date.now().toString(),
      name: body.name,
      phone: body.phone,
      car: body.car,
      method: body.method,
      time: body.time,
      createdAt: new Date().toISOString()
    };

    const data = fs.readFileSync(dbPath, 'utf8');
    const leads = JSON.parse(data);
    
    leads.unshift(newLead); // Add to top
    
    fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2));
    
    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    ensureDb();
    const body = await request.json();
    const { id, isContacted, missedCalls } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const data = fs.readFileSync(dbPath, 'utf8');
    let leads = JSON.parse(data);
    
    const leadIndex = leads.findIndex((l: any) => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    if (isContacted !== undefined) leads[leadIndex].isContacted = isContacted;
    if (missedCalls !== undefined) leads[leadIndex].missedCalls = missedCalls;

    fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2));
    
    return NextResponse.json({ success: true, lead: leads[leadIndex] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    ensureDb();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const data = fs.readFileSync(dbPath, 'utf8');
    let leads = JSON.parse(data);
    
    const initialLength = leads.length;
    leads = leads.filter((l: any) => l.id !== id);
    
    if (leads.length === initialLength) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
