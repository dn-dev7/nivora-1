import {env} from 'cloudflare:workers';
import {SupabaseDatabase} from './supabase-db';
export function database():D1Database{
 const config=env as unknown as {DB?:D1Database;SUPABASE_URL?:string;SUPABASE_SERVER_TOKEN?:string};
 if(config.SUPABASE_URL){if(!config.SUPABASE_SERVER_TOKEN)throw Error('O armazenamento está indisponível.');return new SupabaseDatabase(config.SUPABASE_URL,config.SUPABASE_SERVER_TOKEN) as unknown as D1Database}
 if(!config.DB)throw Error('O armazenamento está indisponível. Tente novamente.');return config.DB;
}
