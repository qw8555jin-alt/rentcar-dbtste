import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({ leads });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newLead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        car: body.car,
        method: body.method,
        time: body.time,
      },
    });
    
    return NextResponse.json({ success: true, lead: newLead });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save lead', details: error.message, stack: error.stack }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, isContacted, missedCalls } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        ...(isContacted !== undefined && { isContacted }),
        ...(missedCalls !== undefined && { missedCalls }),
      },
    });
    
    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.lead.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
