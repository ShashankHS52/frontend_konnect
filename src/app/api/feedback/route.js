
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Get the database instance, using the correct database name.
async function getDb() {
    try {
        const client = await clientPromise;
        // You can use ping to verify a successful connection.
        await client.db("admin").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");
        return client.db("internship_portalDB");
    } catch(e) {
        console.error("Failed to connect to MongoDB", e);
        return null;
    }
}

// GET all feedback
export async function GET() {
    const db = await getDb();
    if (!db) {
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    
    try {
        const feedbacks = await db.collection('feedbacks').find({}).sort({ timestamp: -1 }).toArray();
        return NextResponse.json(feedbacks);
    } catch (e) {
        console.error('Failed to fetch feedback', e);
        return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
    }
}

// POST new feedback
export async function POST(request) {
    const db = await getDb();
    if (!db) {
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    try {
        const feedback = await request.json();
        const result = await db.collection('feedbacks').insertOne({
            ...feedback,
            timestamp: new Date().toISOString(),
            status: 'Pending',
        });
        return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 });
    } catch (e) {
        console.error('Failed to create feedback', e);
        return NextResponse.json({ error: 'Failed to create feedback' }, { status: 500 });
    }
}

// PUT (update) feedback status
export async function PUT(request) {
    const db = await getDb();
    if (!db) {
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    try {
        const { id, status } = await request.json();
        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
        }
        
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
