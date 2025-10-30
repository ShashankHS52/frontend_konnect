
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

async function getDb() {
    const client = await clientPromise;
    return client.db(process.env.MONGODB_DB_NAME);
}

// GET all feedback
export async function GET() {
    try {
        const db = await getDb();
        const feedbacks = await db.collection('feedbacks').find({}).sort({ timestamp: -1 }).toArray();
        return NextResponse.json(feedbacks);
    } catch (e) {
        console.error('Failed to fetch feedback', e);
        return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
    }
}

// POST new feedback
export async function POST(request) {
    try {
        const feedback = await request.json();
        const db = await getDb();
        const result = await db.collection('feedbacks').insertOne({
            ...feedback,
            timestamp: new Date().toISOString(),
            status: 'Pending',
        });
        return NextResponse.json(result, { status: 201 });
    } catch (e) {
        console.error('Failed to create feedback', e);
        return NextResponse.json({ error: 'Failed to create feedback' }, { status: 500 });
    }
}

// PUT (update) feedback status
export async function PUT(request) {
    try {
        const { id, status } = await request.json();
        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
        }
        const db = await getDb();
        const result = await db.collection('feedbacks').updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: status } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Feedback status updated' }, { status: 200 });
    } catch (e) {
        console.error('Failed to update feedback status', e);
        return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
    }
}
