import Entry from '../entry';
import {getAuthUser} from '@/lib/supabase-auth';
export const dynamic='force-dynamic';
export default async function Create(){const user=await getAuthUser();return <Entry mode="create" authenticated={!!user} initialName={user?.fullName?.split(' ')[0]??''}/>}
