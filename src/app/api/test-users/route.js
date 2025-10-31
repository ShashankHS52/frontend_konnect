
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

async function getDb() {
    const client = await clientPromise;
    return client.db("internship_portalDB");
}

// GET all test users
export async function GET() {
    try {
        const db = await getDb();
        const users = await db.collection('test_users').find({}).toArray();
        return NextResponse.json(users);
    } catch (e) {
        console.error('Failed to fetch test users', e);
        return NextResponse.json({ error: 'Failed to fetch test users' }, { status: 500 });
    }
}

// POST new test user
export async function POST(request) {
    try {
        const db = await getDb();
        const { name, email } = await request.json();

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }

        const result = await db.collection('test_users').insertOne({
            name,
            email,
        });
        
        const newUser = { _id: result.insertedId, name, email };

        return NextResponse.json({ success: true, user: newUser }, { status: 201 });
    } catch (e) {
        console.error('Failed to create test user', e);
        return NextResponse.json({ error: 'Failed to create test user' }, { status: 500 });
    }
}
