
import { InvitesList } from './components/invites-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function InvitesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Invite Link Management</CardTitle>
                <CardDescription>Manage and track all generated invite links for colleges and organizations.</CardDescription>
            </CardHeader>
            <CardContent>
                <InvitesList />
            </CardContent>
        </Card>
    );
}
