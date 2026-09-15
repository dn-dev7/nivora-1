import Entry from '../entry';
import {getChatGPTUser} from '../chatgpt-auth';
export const dynamic='force-dynamic';
export default async function Login(){const user=await getChatGPTUser();return <Entry mode="login" authenticated={!!user} initialName={user?.fullName?.split(' ')[0]??''}/>}
