import { InviteGenerator } from './components/invite-generator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function InvitesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Invite Link Management</CardTitle>
                <CardDescription>Generate and manage unique, time-bound invite links for colleges and organizations.</CardDescription>
            </CardHeader>
            <CardContent>
                <InviteGenerator />
            </CardContent>
        </Card>
    );
}
