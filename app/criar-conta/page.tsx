import Entry from '../entry';
import {getAuthUser} from '@/lib/supabase-auth';
export const dynamic='force-dynamic';
export default async function Create({searchParams}:{searchParams:Promise<{preview?:string}>}){const query=await searchParams;if(query.preview==='1')return <Entry mode="create" authenticated={true} preview/>;const user=await getAuthUser();return <Entry mode="create" authenticated={!!user} initialName={user?.fullName?.split(' ')[0]??''}/>}
