import {useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';

type Mode = 'welcome' | 'login' | 'signup' | 'app';
type Tab = 'Hoje' | 'Progresso' | 'Estudar' | 'Comunidade' | 'Perfil';

const SUPABASE_URL = 'https://dzvvyrcpreprqzvsswie.supabase.co';
const SUPABASE_KEY = 'sb_publishable_A1rZ91B2l0D1QS9xck1tGw_b5WeUrCu';

export default function App() {
  const [mode, setMode] = useState<Mode>('welcome');
  const [tab, setTab] = useState<Tab>('Hoje');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sessionEmail, setSessionEmail] = useState('');

  const canSubmit = useMemo(
    () => /^[^\s@]+@gmail\.com$/i.test(email.trim()) && password.length >= (mode === 'signup' ? 8 : 1),
    [email, password, mode],
  );

  async function authenticate() {
    if (!canSubmit || busy) return;
    setBusy(true);
    setError('');
    try {
      const cleanEmail = email.trim().toLowerCase();
      const path = mode === 'signup' ? '/auth/v1/signup' : '/auth/v1/token?grant_type=password';
      const response = await fetch(SUPABASE_URL + path, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: cleanEmail, password}),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const code = data?.error_code ?? data?.code;
        if (code === 'invalid_credentials') throw new Error('Gmail ou senha incorretos.');
        if (code === 'email_not_confirmed') throw new Error('A confirmação de e-mail ainda está ativa no Supabase.');
        if (code === 'weak_password') throw new Error('Use uma senha mais forte.');
        throw new Error(data?.msg ?? data?.message ?? 'Não foi possível entrar.');
      }
      if (mode === 'signup' && !data?.access_token) {
        throw new Error('A confirmação de e-mail ainda está ativa no Supabase. Desative Confirm email para entrar direto.');
      }
      setSessionEmail(data?.user?.email ?? cleanEmail);
      setPassword('');
      setMode('app');
      setTab('Hoje');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível continuar.');
    } finally {
      setBusy(false);
    }
  }

  if (mode === 'welcome') {
    return (
      <SafeAreaView style={styles.root}>
        <StatusBar style="light" backgroundColor="#101110" />
        <View style={styles.welcomeWrap}>
          <View style={styles.pet}>
            <View style={styles.petEarLeft} />
            <View style={styles.petEarRight} />
            <View style={styles.petFace}>
              <View style={styles.petEye} />
              <View style={styles.petEye} />
            </View>
          </View>
          <Text style={styles.hero}>Cada estudo.\nCada conquista.\nNo seu ritmo.</Text>
          <Pressable style={styles.primary} onPress={() => setMode('signup')}>
            <Text style={styles.primaryText}>Criar conta</Text>
          </Pressable>
          <Pressable style={styles.secondary} onPress={() => setMode('login')}>
            <Text style={styles.secondaryText}>Já tenho conta</Text>
          </Pressable>
        </View>
        <Text style={styles.wordmark}>nivo<Text style={styles.wordmarkLight}>study</Text><Text style={styles.lime}>.</Text></Text>
      </SafeAreaView>
    );
  }

  if (mode === 'login' || mode === 'signup') {
    return (
      <SafeAreaView style={styles.root}>
        <StatusBar style="light" backgroundColor="#101110" />
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.authTop}>
            <Pressable style={styles.back} onPress={() => {setMode('welcome'); setError('');}}>
              <Text style={styles.backText}>‹</Text>
            </Pressable>
          </View>
          <View style={styles.authBody}>
            <Text style={styles.authTitle}>{mode === 'signup' ? 'Crie sua conta' : 'Entre no seu ritmo'}</Text>
            <Text style={styles.muted}>{mode === 'signup' ? 'Gmail e senha. Sem etapas desnecessárias.' : 'Use o Gmail e a senha da sua conta.'}</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="seu@gmail.com"
              placeholderTextColor="#727972"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder={mode === 'signup' ? 'Crie uma senha' : 'Sua senha'}
              placeholderTextColor="#727972"
              secureTextEntry
              autoCapitalize="none"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable style={[styles.primary, !canSubmit && styles.disabled]} disabled={!canSubmit || busy} onPress={authenticate}>
              <Text style={styles.primaryText}>{busy ? 'Só um instante…' : mode === 'signup' ? 'Criar conta' : 'Entrar'}</Text>
            </Pressable>
            <Pressable onPress={() => {setMode(mode === 'signup' ? 'login' : 'signup'); setError('');}}>
              <Text style={styles.switchText}>{mode === 'signup' ? 'Já tem conta? Entrar' : 'Primeira vez? Criar conta'}</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" backgroundColor="#101110" />
      <ScrollView contentContainerStyle={styles.page}>
        <Text style={styles.eyebrow}>NIVOSTUDY</Text>
        <Text style={styles.pageTitle}>{tab}</Text>
        {tab === 'Hoje' && <>
          <View style={styles.heroCard}>
            <Text style={styles.cardEyebrow}>SEU DIA</Text>
            <Text style={styles.cardTitle}>Pronto para começar?</Text>
            <Text style={styles.muted}>Escolha uma matéria e faça uma sessão curta. O ritmo vem depois.</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.smallCard}><Text style={styles.metric}>0 min</Text><Text style={styles.muted}>foco hoje</Text></View>
            <View style={styles.smallCard}><Text style={styles.metric}>0</Text><Text style={styles.muted}>questões</Text></View>
          </View>
          <View style={styles.panel}>
            <Text style={styles.cardEyebrow}>PRÓXIMO PASSO</Text>
            <Text style={styles.cardTitle}>Uma matéria por vez</Text>
            <Text style={styles.muted}>Use o botão central para iniciar uma sessão.</Text>
          </View>
        </>}
        {tab === 'Estudar' && <View style={styles.panel}><Text style={styles.cardEyebrow}>ESTUDAR</Text><Text style={styles.cardTitle}>Escolha seu formato</Text><Text style={styles.muted}>Foco, quiz, questões, flashcards, simulado e caderno de erros entram aqui.</Text></View>}
        {tab === 'Progresso' && <View style={styles.panel}><Text style={styles.cardEyebrow}>PROGRESSO</Text><Text style={styles.cardTitle}>Seu ritmo em números</Text><Text style={styles.muted}>Tempo, acertos, sequência e evolução por matéria.</Text></View>}
        {tab === 'Comunidade' && <View style={styles.panel}><Text style={styles.cardEyebrow}>COMUNIDADE</Text><Text style={styles.cardTitle}>Estude junto</Text><Text style={styles.muted}>Sessões, resumos e conquistas compartilhadas.</Text></View>}
        {tab === 'Perfil' && <View style={styles.panel}><Text style={styles.cardEyebrow}>PERFIL</Text><Text style={styles.cardTitle}>{sessionEmail || 'Sua conta'}</Text><Text style={styles.muted}>Matérias, rotina e preferências ficam aqui.</Text><Pressable style={styles.logout} onPress={() => {setMode('welcome'); setSessionEmail('');}}><Text style={styles.logoutText}>Sair</Text></Pressable></View>}
      </ScrollView>

      <View style={styles.bottomBar}>
        <NavButton active={tab === 'Hoje'} symbol="⌂" onPress={() => setTab('Hoje')} />
        <NavButton active={tab === 'Progresso'} symbol="↗" onPress={() => setTab('Progresso')} />
        <Pressable style={styles.centerButton} onPress={() => setTab('Estudar')}><Text style={styles.plus}>+</Text></Pressable>
        <NavButton active={tab === 'Comunidade'} symbol="◌" onPress={() => setTab('Comunidade')} />
        <NavButton active={tab === 'Perfil'} symbol="○" onPress={() => setTab('Perfil')} />
      </View>
    </SafeAreaView>
  );
}

function NavButton({active, symbol, onPress}:{active:boolean; symbol:string; onPress:()=>void}) {
  return <Pressable style={styles.navItem} onPress={onPress}><Text style={[styles.navSymbol, active && styles.navActive]}>{symbol}</Text></Pressable>;
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#101110'},
  flex: {flex: 1},
  welcomeWrap: {flex: 1, justifyContent: 'center', paddingHorizontal: 28},
  pet: {width: 86, height: 72, alignSelf: 'center', marginBottom: 30, position: 'relative'},
  petFace: {position: 'absolute', left: 8, right: 8, bottom: 0, height: 58, borderRadius: 24, backgroundColor: '#C4F568', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14},
  petEarLeft: {position: 'absolute', left: 10, top: 2, width: 24, height: 28, borderRadius: 8, backgroundColor: '#C4F568', transform: [{rotate: '-18deg'}]},
  petEarRight: {position: 'absolute', right: 10, top: 2, width: 24, height: 28, borderRadius: 8, backgroundColor: '#C4F568', transform: [{rotate: '18deg'}]},
  petEye: {width: 7, height: 10, borderRadius: 6, backgroundColor: '#101110'},
  hero: {color: '#F2F4F0', fontSize: 38, lineHeight: 42, fontWeight: '800', letterSpacing: -1.4, textAlign: 'center', marginBottom: 34},
  primary: {height: 54, borderRadius: 17, backgroundColor: '#C4F568', alignItems: 'center', justifyContent: 'center', marginTop: 16},
  primaryText: {color: '#101110', fontSize: 16, fontWeight: '800'},
  secondary: {height: 50, alignItems: 'center', justifyContent: 'center'},
  secondaryText: {color: '#F2F4F0', fontSize: 15, fontWeight: '600'},
  wordmark: {position: 'absolute', bottom: 22, alignSelf: 'center', color: '#F2F4F0', fontSize: 18, fontWeight: '800', letterSpacing: -.5},
  wordmarkLight: {fontWeight: '500'},
  lime: {color: '#C4F568'},
  authTop: {padding: 18},
  back: {width: 40, height: 40, borderRadius: 14, borderWidth: 1, borderColor: '#2B302B', alignItems: 'center', justifyContent: 'center'},
  backText: {color: '#F2F4F0', fontSize: 28, lineHeight: 30},
  authBody: {flex: 1, justifyContent: 'center', paddingHorizontal: 26, paddingBottom: 70},
  authTitle: {color: '#F2F4F0', fontSize: 32, fontWeight: '800', letterSpacing: -1, marginBottom: 8},
  muted: {color: '#A5ADA5', fontSize: 14, lineHeight: 20},
  input: {height: 56, borderRadius: 17, borderWidth: 1, borderColor: '#2B302B', backgroundColor: '#191B19', color: '#F2F4F0', fontSize: 16, paddingHorizontal: 17, marginTop: 14},
  error: {color: '#ff8e8e', fontSize: 13, lineHeight: 18, marginTop: 12},
  disabled: {opacity: .45},
  switchText: {color: '#C4F568', fontSize: 14, fontWeight: '700', textAlign: 'center', marginTop: 20},
  page: {paddingHorizontal: 18, paddingTop: 20, paddingBottom: 116},
  eyebrow: {color: '#C4F568', fontSize: 11, fontWeight: '800', letterSpacing: 1.8},
  pageTitle: {color: '#F2F4F0', fontSize: 34, fontWeight: '800', letterSpacing: -1.2, marginTop: 5, marginBottom: 22},
  heroCard: {backgroundColor: '#191B19', borderWidth: 1, borderColor: '#2B302B', borderRadius: 24, padding: 22, minHeight: 180, justifyContent: 'flex-end'},
  panel: {backgroundColor: '#191B19', borderWidth: 1, borderColor: '#2B302B', borderRadius: 22, padding: 20, marginTop: 14},
  row: {flexDirection: 'row', gap: 12, marginTop: 12},
  smallCard: {flex: 1, backgroundColor: '#191B19', borderWidth: 1, borderColor: '#2B302B', borderRadius: 20, padding: 18},
  cardEyebrow: {color: '#C4F568', fontSize: 11, fontWeight: '800', letterSpacing: 1.3, marginBottom: 7},
  cardTitle: {color: '#F2F4F0', fontSize: 21, fontWeight: '750', letterSpacing: -.5, marginBottom: 7},
  metric: {color: '#F2F4F0', fontSize: 26, fontWeight: '800', marginBottom: 3},
  logout: {marginTop: 18, alignSelf: 'flex-start', borderWidth: 1, borderColor: '#343934', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10},
  logoutText: {color: '#F2F4F0', fontWeight: '700'},
  bottomBar: {position: 'absolute', left: 14, right: 14, bottom: Platform.OS === 'ios' ? 14 : 12, height: 68, borderRadius: 22, backgroundColor: '#111311', borderWidth: 1, borderColor: '#2B302B', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, shadowColor: '#000', shadowOpacity: .35, shadowRadius: 18, shadowOffset: {width: 0, height: 8}, elevation: 14},
  navItem: {flex: 1, height: 50, alignItems: 'center', justifyContent: 'center'},
  navSymbol: {color: '#8E948B', fontSize: 25, fontWeight: '500'},
  navActive: {color: '#C4F568'},
  centerButton: {width: 54, height: 52, borderRadius: 16, backgroundColor: '#C4F568', alignItems: 'center', justifyContent: 'center', marginHorizontal: 5},
  plus: {color: '#11150D', fontSize: 34, lineHeight: 36, fontWeight: '300'},
});
