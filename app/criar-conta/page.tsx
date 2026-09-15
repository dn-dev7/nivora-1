import Entry from '../entry';
import {getChatGPTUser} from '../chatgpt-auth';
export const dynamic='force-dynamic';
export default async function Create(){const user=await getChatGPTUser();return <Entry mode="create" authenticated={!!user} initialName={user?.fullName?.split(' ')[0]??''}/>}
