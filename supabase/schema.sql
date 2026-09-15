CREATE TABLE "activities" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"kind" text NOT NULL,
	"subject" text NOT NULL,
	"topic" text NOT NULL,
	"seconds" bigint DEFAULT 0 NOT NULL,
	"count" bigint DEFAULT 0 NOT NULL,
	"correct" bigint DEFAULT 0 NOT NULL,
	"xp" bigint DEFAULT 0 NOT NULL,
	"data" text NOT NULL,
	"visibility" text DEFAULT 'private' NOT NULL,
	"created" bigint NOT NULL
);

CREATE INDEX "idx_activities_owner_created" ON "activities" ("owner","created");
CREATE TABLE "cards" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"subject" text NOT NULL,
	"front" text NOT NULL,
	"back" text NOT NULL,
	"due" bigint NOT NULL,
	"interval" bigint DEFAULT 0 NOT NULL
);

CREATE INDEX "idx_cards_owner_due" ON "cards" ("owner","due");
CREATE TABLE "comments" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"activity" text NOT NULL,
	"body" text NOT NULL,
	"created" bigint NOT NULL
);

CREATE INDEX "idx_comments_activity" ON "comments" ("activity");
CREATE TABLE "exams" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"name" text NOT NULL,
	"subject" text NOT NULL,
	"date" text NOT NULL,
	"topics" text NOT NULL
);

CREATE INDEX "idx_exams_owner" ON "exams" ("owner");
CREATE TABLE "follows" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"target" text NOT NULL
);

CREATE INDEX "idx_follows_owner" ON "follows" ("owner");
CREATE TABLE "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"nickname" text NOT NULL,
	"handle" text NOT NULL,
	"subjects" text NOT NULL,
	"goal" bigint DEFAULT 5 NOT NULL,
	"created" bigint NOT NULL
);

CREATE UNIQUE INDEX "profiles_handle_unique" ON "profiles" ("handle");
CREATE TABLE "reactions" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"activity" text NOT NULL
);

CREATE INDEX "idx_reactions_activity" ON "reactions" ("activity");
CREATE TABLE "runs" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"kind" text NOT NULL,
	"ids" text NOT NULL,
	"started" bigint NOT NULL,
	"duration" bigint NOT NULL,
	"finished" bigint DEFAULT 0 NOT NULL
);

CREATE INDEX "idx_runs_owner" ON "runs" ("owner");
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"subject" text NOT NULL,
	"topic" text NOT NULL,
	"goal" text NOT NULL,
	"duration" bigint NOT NULL,
	"started" bigint NOT NULL,
	"accumulated" bigint DEFAULT 0 NOT NULL,
	"running" bigint DEFAULT 1 NOT NULL,
	"finished" bigint DEFAULT 0 NOT NULL
);

CREATE INDEX "idx_sessions_owner" ON "sessions" ("owner");
ALTER TABLE runs ADD draft text DEFAULT '{}' NOT NULL;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.profiles FROM anon, authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.activities FROM anon, authenticated;
GRANT ALL ON public.activities TO service_role;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.sessions FROM anon, authenticated;
GRANT ALL ON public.sessions TO service_role;
ALTER TABLE public.runs ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.runs FROM anon, authenticated;
GRANT ALL ON public.runs TO service_role;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.cards FROM anon, authenticated;
GRANT ALL ON public.cards TO service_role;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.exams FROM anon, authenticated;
GRANT ALL ON public.exams TO service_role;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.follows FROM anon, authenticated;
GRANT ALL ON public.follows TO service_role;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.reactions FROM anon, authenticated;
GRANT ALL ON public.reactions TO service_role;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.comments FROM anon, authenticated;
GRANT ALL ON public.comments TO service_role;
CREATE SCHEMA IF NOT EXISTS nivostudy_private;
REVOKE ALL ON SCHEMA nivostudy_private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA nivostudy_private TO service_role;
CREATE TABLE nivostudy_private.statements(key text primary key, template text not null, param_count integer not null, is_read boolean not null);
ALTER TABLE nivostudy_private.statements ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON nivostudy_private.statements TO service_role;
INSERT INTO nivostudy_private.statements VALUES('c0f45c62c2d09c41c33354c3e924fa649b4fcd9a0d5c5b24c66e021167ff357f','SELECT * FROM profiles WHERE id=?',1,true);
INSERT INTO nivostudy_private.statements VALUES('dd995e695c4c6dab5d6245b19621ca985a94d65820a0892fa61013876028037f','SELECT * FROM activities WHERE owner=? ORDER BY created ASC',1,true);
INSERT INTO nivostudy_private.statements VALUES('bd38e6962f820366b09e895b6218170d580d51fc4edd111011e2eb2680192507','SELECT * FROM exams WHERE owner=? ORDER BY date',1,true);
INSERT INTO nivostudy_private.statements VALUES('fa095fe51bb8812c1f97f861b0ba40367cc577fdabb2106e18b583b3166fa368','SELECT * FROM cards WHERE owner=? ORDER BY due',1,true);
INSERT INTO nivostudy_private.statements VALUES('91e36e79b17844ec2d501bf6e348c2ef4659f3f89d5c9ed167ccbf047e1f0537','SELECT * FROM sessions WHERE owner=? AND finished=0 ORDER BY started DESC LIMIT 1',1,true);
INSERT INTO nivostudy_private.statements VALUES('32bbccc731d4fa8cfa14c4bd538d3c051e7f789d5aafb3791a1a0104ab53db9c','SELECT * FROM runs WHERE owner=? AND finished=0 ORDER BY started DESC LIMIT 1',1,true);
INSERT INTO nivostudy_private.statements VALUES('b3a2af7d00b652f5498b3a8ceffd3c796220fe7757be1ce05126e59273675e62','SELECT p.id,p.nickname,p.handle,EXISTS(SELECT 1 FROM follows r WHERE r.owner=p.id AND r.target=?) AS mutual FROM follows f JOIN profiles p ON p.id=f.target WHERE f.owner=?',2,true);
INSERT INTO nivostudy_private.statements VALUES('9fa8ddc9ecae0fece08c294a415ea3677f01e32d538b3e7f88f46107d9432b78','SELECT a.id,a.kind,a.subject,a.topic,a.seconds,a.count,a.correct,a.xp,a.created,a.visibility,p.nickname,p.handle,(SELECT COUNT(*) FROM reactions r WHERE r.activity=a.id) AS applause,EXISTS(SELECT 1 FROM reactions r WHERE r.activity=a.id AND r.owner=?) AS applauded FROM activities a JOIN profiles p ON p.id=a.owner WHERE a.visibility=''public'' OR (a.visibility=''friends'' AND EXISTS(SELECT 1 FROM follows f WHERE f.owner=? AND f.target=a.owner) AND EXISTS(SELECT 1 FROM follows f WHERE f.owner=a.owner AND f.target=?)) ORDER BY a.created DESC LIMIT 40',3,true);
INSERT INTO nivostudy_private.statements VALUES('cf19b6f1dd4e9488700b7bb3d6749b0a439582d8cb9d0e1e2a78db3ffb96b995','INSERT INTO profiles(id,nickname,handle,subjects,goal,created) VALUES(?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET nickname=excluded.nickname,handle=excluded.handle,subjects=excluded.subjects,goal=excluded.goal',6,false);
INSERT INTO nivostudy_private.statements VALUES('66c2dad92c85f2d8a6221a91668286d69defe482a87ff254ba99940138927bf2','SELECT id FROM sessions WHERE owner=? AND finished=0',1,true);
INSERT INTO nivostudy_private.statements VALUES('f5279937d1b0f2b0579bd6980cb90d4e163213b4c59f0a3cbeaa98a31f3b9188','INSERT INTO sessions(id,owner,subject,topic,goal,duration,started,accumulated,running,finished) VALUES(?,?,?,?,?,?,?,0,1,0)',7,false);
INSERT INTO nivostudy_private.statements VALUES('00dafcf1f8b0399d42fe06cf8fe63ad5fc5987930ad7d35dd970e171de0a8632','SELECT * FROM sessions WHERE id=? AND owner=?',2,true);
INSERT INTO nivostudy_private.statements VALUES('766548ec5182f135b452a613a7dfabe6d26f586152500f8987f785cc6f8d249c','UPDATE sessions SET accumulated=?,running=0 WHERE id=? AND owner=? AND finished=0',3,false);
INSERT INTO nivostudy_private.statements VALUES('102592887f2224ca0aff247645d5814e5ac80fcfbd5eba3ed3650d3ea57604c3','UPDATE sessions SET started=?,running=1 WHERE id=? AND owner=? AND finished=0 AND running=0',3,false);
INSERT INTO nivostudy_private.statements VALUES('898951c5717fbbf86c04dacb9012e7fabf2649da7dc35e4a7629e6afe0914817','SELECT COUNT(*) AS count FROM activities WHERE owner=? AND kind=''focus'' AND created>=?',2,true);
INSERT INTO nivostudy_private.statements VALUES('71f48dbef10ec568138ac989a478de9d9ac753db26d6db13dbdede69ad562bec','INSERT INTO activities(id,owner,kind,subject,topic,seconds,count,correct,xp,data,visibility,created) SELECT id,owner,''focus'',subject,topic,?,0,0,?,?,''private'',? FROM sessions WHERE id=? AND owner=? AND finished=0 ON CONFLICT DO NOTHING',6,false);
INSERT INTO nivostudy_private.statements VALUES('0ee9ae9af94361906b08b3bc0d9275b8f009dd4021828008b56ffc295af55cfe','UPDATE sessions SET accumulated=?,running=0,finished=1 WHERE id=? AND owner=? AND finished=0',3,false);
INSERT INTO nivostudy_private.statements VALUES('07031a3084703ca5848da48f652caff7d438b4679c6cd5e0ad56ed45a01d7dd0','SELECT id FROM runs WHERE owner=? AND finished=0',1,true);
INSERT INTO nivostudy_private.statements VALUES('5babc91b2ba6b2318a7e941a990d65b8d192bb9268fb4f05fb502d9e22d8333c','INSERT INTO runs(id,owner,kind,ids,started,duration,finished) VALUES(?,?,?,?,?,?,0)',6,false);
INSERT INTO nivostudy_private.statements VALUES('aacf23011075e21aaadcd1dce8d046a31e2ff43cb309d847184eaab84bc80990','SELECT * FROM runs WHERE id=? AND owner=? AND finished=0',2,true);
INSERT INTO nivostudy_private.statements VALUES('cdab9db7b8bec58570e3efe4968f436b389a4c67da666ce33f0aabccaa257b50','UPDATE runs SET draft=? WHERE id=? AND owner=? AND finished=0',3,false);
INSERT INTO nivostudy_private.statements VALUES('497067f01720a43bafa2703190a9a0a4dc27d6a76774fff0d793160d18e63b91','SELECT * FROM runs WHERE id=? AND owner=?',2,true);
INSERT INTO nivostudy_private.statements VALUES('f9c12e7ff24cd3f7f4ce85a1315f420eac46b65b7ea9cff57723b45d24c57c8c','SELECT data,xp FROM activities WHERE id=? AND owner=?',2,true);
INSERT INTO nivostudy_private.statements VALUES('cf51b9eedd4962fcdfcf979a884ce8511d49b1c1e49dc2dbb989165f4e127ce9','SELECT data FROM activities WHERE owner=? AND created>=? AND count>0',2,true);
INSERT INTO nivostudy_private.statements VALUES('9fb242d058f12a605bd61c164d5b34e49e8dec4221cbdf5cbcccb8e400aa5a0d','INSERT INTO activities(id,owner,kind,subject,topic,seconds,count,correct,xp,data,visibility,created) SELECT id,owner,kind,?,?,0,?,?,?,?,''private'',? FROM runs WHERE id=? AND owner=? AND finished=0 ON CONFLICT DO NOTHING',9,false);
INSERT INTO nivostudy_private.statements VALUES('8648915f45753a938250594b4021b97d61297a444897543fa1b2fdbf093f506a','UPDATE runs SET finished=1 WHERE id=? AND owner=?',2,false);
INSERT INTO nivostudy_private.statements VALUES('87b2cf7d35286b9668f97ca9247f6995a1e2305c7a823cbae66fdc2be9572649','INSERT INTO exams(id,owner,name,subject,date,topics) VALUES(?,?,?,?,?,?)',6,false);
INSERT INTO nivostudy_private.statements VALUES('bcbb259192c1016c814248a665407c0a0d04926cc375fd4514e2ead21ff3c1c0','DELETE FROM exams WHERE id=? AND owner=?',2,false);
INSERT INTO nivostudy_private.statements VALUES('d7ba1d72c94c72bf21628b1e5e9eb5c0856e433fdb6ddf1101b2c2385519d04c','INSERT INTO cards(id,owner,subject,front,back,due,interval) VALUES(?,?,?,?,?,?,0)',6,false);
INSERT INTO nivostudy_private.statements VALUES('35da5ab84aca6af92df55e0b99b458a0f668b9214801a6342405e6b21b2e278c','SELECT * FROM cards WHERE id=? AND owner=?',2,true);
INSERT INTO nivostudy_private.statements VALUES('8177caf1d5f5ddf47892d430c3272018729eaeb8136cfb392fc6669a362c05cb','INSERT INTO activities(id,owner,kind,subject,topic,seconds,count,correct,xp,data,visibility,created) SELECT ?,owner,''review'',subject,''Flashcards'',0,0,0,5,?,''private'',? FROM cards WHERE id=? AND owner=? AND due=? ON CONFLICT DO NOTHING',6,false);
INSERT INTO nivostudy_private.statements VALUES('f31a36970c3ae7a6999358621a13536d29368662c07bc121e8e25e8b2dec88c0','UPDATE cards SET due=?,interval=? WHERE id=? AND owner=? AND due=?',5,false);
INSERT INTO nivostudy_private.statements VALUES('b68aec949ae0ea957382f2ac7d312ebcc5e70aef4c0d3d490d7f288e81e957cb','UPDATE activities SET visibility=? WHERE id=? AND owner=?',3,false);
INSERT INTO nivostudy_private.statements VALUES('11707afc91e66b23ede3cb5201c55d23e1dcde474fc81613e301e3a952830f40','SELECT id FROM profiles WHERE handle=?',1,true);
INSERT INTO nivostudy_private.statements VALUES('4f0fbe2b163e1a719ff80162f331237830a439fa18442464366970b6217a0878','INSERT INTO follows(id,owner,target) VALUES(?,?,?) ON CONFLICT DO NOTHING',3,false);
INSERT INTO nivostudy_private.statements VALUES('e286a139c3650b3bd5fd4d8cebb7b238fb6b739ea2deb0096a5b396c80c2034b','DELETE FROM follows WHERE owner=? AND target=?',2,false);
INSERT INTO nivostudy_private.statements VALUES('d54631b7750f4e19180f0d1eb27f6974f74866ebc0adb9486d0d1b1bbaea11a3','SELECT id FROM activities a WHERE id=? AND (owner=? OR visibility=''public'' OR (visibility=''friends'' AND EXISTS(SELECT 1 FROM follows f WHERE f.owner=? AND f.target=a.owner) AND EXISTS(SELECT 1 FROM follows f WHERE f.owner=a.owner AND f.target=?)))',4,true);
INSERT INTO nivostudy_private.statements VALUES('2332c71aa59520f1bdfa6527f4a2826cb1ae529a70cacc3b391102456d83ced7','SELECT id FROM reactions WHERE id=?',1,true);
INSERT INTO nivostudy_private.statements VALUES('cf07933c5878e6d6ebed27e156ae7f38930f0282af4f75e90b01224e8c4249fe','DELETE FROM reactions WHERE id=?',1,false);
INSERT INTO nivostudy_private.statements VALUES('e637cdd96d293a4f6fe0965ae941744aee4af7efdb25348ba781e5737d656fc6','INSERT INTO reactions(id,owner,activity) VALUES(?,?,?)',3,false);
INSERT INTO nivostudy_private.statements VALUES('5bcb242359281e477a66194e112f64c57a451a3da8876cfa345bb7c73ed81efd','INSERT INTO comments(id,owner,activity,body,created) VALUES(?,?,?,?,?)',5,false);
INSERT INTO nivostudy_private.statements VALUES('9d329c3442e2020c92e24b651996d041c8bf2d3973af10728954cbb36c18c24f','SELECT c.id,c.body,c.created,p.nickname FROM comments c JOIN profiles p ON p.id=c.owner WHERE activity=? ORDER BY created DESC LIMIT 30',1,true);
INSERT INTO nivostudy_private.statements VALUES('370af62dabb9ba15f6b905eda94e9855917b832d34c67d3ed995678be9e705a0','DELETE FROM comments WHERE id=? AND owner=?',2,false);

CREATE FUNCTION nivostudy_private.execute_statement(p_key text,p_args jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path=public,nivostudy_private,pg_temp AS $$
DECLARE s nivostudy_private.statements%ROWTYPE; q text; parts text[]; i integer; rows jsonb; changed bigint;
BEGIN
 SELECT * INTO s FROM nivostudy_private.statements WHERE key=p_key;
 IF NOT FOUND THEN RAISE EXCEPTION 'Unregistered application statement'; END IF;
 IF jsonb_typeof(p_args)<>'array' OR jsonb_array_length(p_args)<>s.param_count THEN RAISE EXCEPTION 'Invalid application parameters'; END IF;
 parts:=string_to_array(s.template,'?'); q:=parts[1];
 IF s.param_count>0 THEN FOR i IN 0..s.param_count-1 LOOP q:=q || quote_nullable(p_args->>i) || parts[i+2]; END LOOP; END IF;
 IF s.is_read THEN
  EXECUTE 'SELECT coalesce(jsonb_agg(row_to_json(t)),''[]''::jsonb) FROM (' || q || ') t' INTO rows;
  RETURN jsonb_build_object('success',true,'results',rows,'meta',jsonb_build_object('changes',0));
 END IF;
 EXECUTE q; GET DIAGNOSTICS changed=ROW_COUNT;
 RETURN jsonb_build_object('success',true,'results','[]'::jsonb,'meta',jsonb_build_object('changes',changed));
END $$;
REVOKE ALL ON FUNCTION nivostudy_private.execute_statement(text,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION nivostudy_private.execute_statement(text,jsonb) TO service_role;
CREATE FUNCTION public.nivostudy_batch(p_statements jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path=public,nivostudy_private,pg_temp AS $$
DECLARE item jsonb; output jsonb:='[]'::jsonb;
BEGIN
 IF jsonb_typeof(p_statements)<>'array' OR jsonb_array_length(p_statements)>50 THEN RAISE EXCEPTION 'Invalid batch'; END IF;
 FOR item IN SELECT value FROM jsonb_array_elements(p_statements) LOOP
  output:=output || jsonb_build_array(nivostudy_private.execute_statement(item->>'key',item->'args'));
 END LOOP;
 RETURN output;
END $$;
REVOKE ALL ON FUNCTION public.nivostudy_batch(jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.nivostudy_batch(jsonb) TO service_role;
