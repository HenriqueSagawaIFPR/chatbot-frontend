import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { adminListUsers, adminUpdateUser, adminListChats, adminGetChat, adminDeleteChat, adminGetBotConfig, adminUpdateBotConfig, adminGetAnalytics, adminGetLogs, adminGetAccessLogs } from '../services/api';
import { FaUsers, FaComments, FaEye, FaTrash, FaUserShield, FaUserSlash, FaUserCheck, FaChartBar, FaList } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f7fafc;
`;

const Sidebar = styled.aside`
  width: 280px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  padding: 16px;
  box-sizing: border-box;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  color: #1a202c;
`;

const BackButton = styled.button`
  width: 100%;
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #edf2f7;
  border: 1px solid #e2e8f0;
  color: #1a202c;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  &:hover { 
    background: #e2e8f0; 
    box-shadow: 0 6px 14px rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }
`;

const NavButton = styled.button`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#1a202c'};
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  &:hover { 
    background: ${props => props.$active ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)' : '#f8fafc'}; 
    box-shadow: 0 6px 14px rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #edf2f7;
  &:last-child { border-bottom: none; }
`;

const Small = styled.small`
  color: #4a5568;
`;

const Action = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-left: 8px;
  border-radius: 8px;
  border: 1px solid ${props => props.$variant === 'danger' ? '#feb2b2' : props.$variant === 'primary' ? '#667eea' : '#cbd5e0'};
  background: ${props => props.$variant === 'danger' ? '#fff5f5' : props.$variant === 'primary' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#ffffff'};
  color: ${props => props.$variant === 'primary' ? '#ffffff' : '#1a202c'};
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  &:hover { 
    background: ${props => props.$variant === 'danger' ? '#ffe3e3' : props.$variant === 'primary' ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)' : '#f7fafc'}; 
    box-shadow: 0 6px 14px rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  &:focus { outline: none; border-color: #667eea; background: #fff; }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
`;

const AdminPanel = ({ onBack }) => {
  const { user, isAuthenticated } = useAuth();
  const [view, setView] = useState('users');
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatQuery, setChatQuery] = useState('');
  const [botText, setBotText] = useState('');
  const [botUpdatedAt, setBotUpdatedAt] = useState(null);
  const [success, setSuccess] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [logs, setLogs] = useState([]);
  const [accessLogs, setAccessLogs] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (user?.role !== 'admin') return;
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        if (view === 'users') {
          const data = await adminListUsers();
          setUsers(data);
        } else if (view === 'chats') {
          const data = await adminListChats();
          setChats(data);
        } else if (view === 'bot') {
          const cfg = await adminGetBotConfig();
          setBotText(cfg.systemInstruction || '');
          setBotUpdatedAt(cfg.updatedAt || null);
        } else if (view === 'analytics') {
          const data = await adminGetAnalytics();
          setAnalytics(data);
        } else if (view === 'logs') {
          const [l1, l2] = await Promise.all([
            adminGetLogs(200),
            adminGetAccessLogs(200)
          ]);
          setLogs(l1);
          setAccessLogs(l2);
        }
      } catch (e) {
        setError(e.error || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [view, isAuthenticated, user]);

  if (!isAuthenticated) {
    return <Container><Main><Title>Faça login para acessar</Title></Main></Container>;
  }
  if (user?.role !== 'admin') {
    return <Container><Main><Title>Acesso negado</Title><Small>Somente administradores.</Small></Main></Container>;
  }

  const toggleActive = async (u) => {
    try {
      const updated = await adminUpdateUser(u._id, { isActive: !u.isActive });
      setUsers(prev => prev.map(item => item._id === updated._id ? updated : item));
    } catch (e) {
      setError(e.error || 'Erro ao atualizar usuário');
    }
  };

  const toggleRole = async (u) => {
    try {
      const newRole = u.role === 'admin' ? 'user' : 'admin';
      const updated = await adminUpdateUser(u._id, { role: newRole });
      setUsers(prev => prev.map(item => item._id === updated._id ? updated : item));
    } catch (e) {
      setError(e.error || 'Erro ao atualizar role');
    }
  };

  const viewChat = async (chatId) => {
    try {
      setLoading(true);
      const chat = await adminGetChat(chatId);
      setSelectedChat(chat);
    } catch (e) {
      setError(e.error || 'Erro ao carregar chat');
    } finally {
      setLoading(false);
    }
  };

  const removeChat = async (chatId) => {
    try {
      await adminDeleteChat(chatId);
      setChats(prev => prev.filter(c => c._id !== chatId));
      if (selectedChat?._id === chatId) setSelectedChat(null);
    } catch (e) {
      setError(e.error || 'Erro ao excluir chat');
    }
  };

  return (
    <Container>
      <Sidebar>
        <Title>Painel Admin</Title>
        <Small>Logado como {user.username} ({user.role})</Small>
        <div style={{ height: 16 }} />
        <BackButton onClick={() => { if (onBack) onBack(); }}>
          ← Voltar ao Chat
        </BackButton>
        <NavButton $active={view === 'users'} onClick={() => setView('users')}>
          <FaUsers /> Usuários
        </NavButton>
        <NavButton $active={view === 'chats'} onClick={() => setView('chats')}>
          <FaComments /> Chats
        </NavButton>
        <NavButton $active={view === 'bot'} onClick={() => setView('bot')}>
          🧠 Bot
        </NavButton>
        <NavButton $active={view === 'analytics'} onClick={() => setView('analytics')}>
          <FaChartBar /> Analytics
        </NavButton>
        <NavButton $active={view === 'logs'} onClick={() => setView('logs')}>
          <FaList /> Logs
        </NavButton>
      </Sidebar>
      <Main>
        {error && <Card style={{ borderColor: '#feb2b2', background: '#fff5f5' }}>{error}</Card>}
        {success && <Card style={{ borderColor: '#9ae6b4', background: '#f0fff4' }}>{success}</Card>}
        {view === 'users' && (
          <Card>
            <Title>Usuários</Title>
            {loading ? <Small>Carregando...</Small> : users.map(u => (
              <Row key={u._id}>
                <div>
                  <div>{u.username} <Small>&lt;{u.email}&gt;</Small></div>
                  <Small>Role: {u.role} • Ativo: {u.isActive ? 'sim' : 'não'} • Último login: {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '-'}</Small>
                </div>
                <ActionsGroup>
                  <Action onClick={() => toggleActive(u)} $variant={u.isActive ? 'danger' : 'ghost'}>
                    {u.isActive ? <FaUserSlash /> : <FaUserCheck />}
                    {u.isActive ? 'Desativar' : 'Ativar'}
                  </Action>
                  <Action onClick={() => toggleRole(u)} $variant="primary">
                    <FaUserShield /> {u.role === 'admin' ? 'Tornar usuário' : 'Tornar admin'}
                  </Action>
                </ActionsGroup>
              </Row>
            ))}
          </Card>
        )}

        {view === 'chats' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Card>
              <Toolbar>
                <Title style={{ margin: 0 }}>Chats</Title>
                <SearchInput 
                  placeholder="Filtrar por título..."
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                />
              </Toolbar>
              {loading ? <Small>Carregando...</Small> : chats
                .filter(c => (c.title || '').toLowerCase().includes(chatQuery.toLowerCase()))
                .map(c => (
                <Row key={c._id}>
                  <div>
                    <div>{c.title || '(sem título)'}</div>
                    <Small>ID: {c._id} • Usuário: {c.userId || 'anon'} • Atualizado: {new Date(c.updatedAt).toLocaleString()}</Small>
                  </div>
                  <ActionsGroup>
                    <Action onClick={() => viewChat(c._id)} $variant="primary">
                      <FaEye /> Ver
                    </Action>
                    <Action onClick={() => removeChat(c._id)} $variant="danger">
                      <FaTrash /> Excluir
                    </Action>
                  </ActionsGroup>
                </Row>
              ))}
            </Card>

            <Card>
              <Toolbar>
                <Title style={{ margin: 0 }}>Detalhes do Chat</Title>
                {selectedChat && (
                  <Small>
                    ID: {selectedChat._id} • Mensagens: {selectedChat.messages?.length || 0}
                  </Small>
                )}
              </Toolbar>
              {selectedChat ? (
                <>
                  <TextArea readOnly value={(selectedChat.messages || []).map(m => `${m.role}: ${m.content}`).join('\n\n')} />
                </>
              ) : (
                <Small>Selecione um chat para visualizar</Small>
              )}
            </Card>
          </div>
        )}

        {view === 'bot' && (
          <Card>
            <Toolbar>
              <Title style={{ margin: 0 }}>Personalidade do Bot</Title>
              {botUpdatedAt && <Small>Atualizado: {new Date(botUpdatedAt).toLocaleString()}</Small>}
            </Toolbar>
            <Small>Edite abaixo a instrução do sistema/persona usada pelo modelo.</Small>
            <div style={{ height: 8 }} />
            {loading ? (
              <Small>Carregando...</Small>
            ) : (
              <>
                <TextArea value={botText} onChange={(e) => { setBotText(e.target.value); setSuccess(''); }} />
                <div style={{ height: 8 }} />
                <ActionsGroup>
                  <Action 
                    $variant="primary"
                    onClick={async () => {
                      try {
                        setLoading(true);
                        setError('');
                        setSuccess('');
                        const saved = await adminUpdateBotConfig(botText);
                        setBotUpdatedAt(saved.updatedAt || new Date().toISOString());
                        setSuccess('Personalidade salva com sucesso.');
                      } catch (e) {
                        setError(e.error || 'Erro ao salvar personalidade');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >Salvar</Action>
                </ActionsGroup>
              </>
            )}
          </Card>
        )}

        {view === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Card>
              <Title>KPIs</Title>
              {loading ? (
                <Small>Carregando...</Small>
              ) : analytics ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <Card>
                    <div>Total usuários</div>
                    <strong>{analytics.users?.total ?? 0}</strong>
                    <Small>Ativos: {analytics.users?.active ?? 0} • Admins: {analytics.users?.admins ?? 0}</Small>
                  </Card>
                  <Card>
                    <div>Total chats</div>
                    <strong>{analytics.chats?.total ?? 0}</strong>
                    <Small>Msgs: {analytics.chats?.totalMessages ?? 0} • Média/chat: {analytics.chats?.avgMessagesPerChat ?? 0}</Small>
                  </Card>
                  <Card>
                    <div>Tempo resposta médio</div>
                    <strong>{analytics.performance?.avgMs ?? 0} ms</strong>
                    <Small>P95: {analytics.performance?.p95Ms ?? 0} ms</Small>
                  </Card>
                  <Card>
                    <div>Erros (7 dias)</div>
                    <strong>{analytics.errors?.last7Days ?? 0}</strong>
                  </Card>
                </div>
              ) : (
                <Small>Sem dados</Small>
              )}
            </Card>

            <Card>
              <Title>Séries temporais (7 dias)</Title>
              {loading ? (
                <Small>Carregando...</Small>
              ) : analytics ? (
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <strong>Chats por dia</strong>
                    {(analytics.timeseries?.chatsPerDay || []).map(item => (
                      <div key={`c-${item._id}`}><Small>{item._id}: {item.count}</Small></div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <strong>Mensagens por dia</strong>
                    {(analytics.timeseries?.messagesPerDay || []).map(item => (
                      <div key={`m-${item._id}`}><Small>{item._id}: {item.count}</Small></div>
                    ))}
                  </div>
                  <div>
                    <strong>Acessos por dia</strong>
                    {(analytics.timeseries?.accessesPerDay || []).map(item => (
                      <div key={`a-${item._id}`}><Small>{item._id}: {item.count}</Small></div>
                    ))}
                  </div>
                </div>
              ) : (
                <Small>Sem dados</Small>
              )}
            </Card>
          </div>
        )}

        {view === 'logs' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Card>
              <Toolbar>
                <Title style={{ margin: 0 }}>Logs do Bot</Title>
                <Small>Últimos {logs.length}</Small>
              </Toolbar>
              {loading ? <Small>Carregando...</Small> : (
                <div style={{ maxHeight: 420, overflow: 'auto' }}>
                  {logs.map((l, idx) => (
                    <Row key={l._id || idx}>
                      <div>
                        <div><Small>{new Date(l.timestamp).toLocaleString()} • {l.messageType} • {l.status}</Small></div>
                        <div><strong>Usuário:</strong> <Small>{l.userName}</Small></div>
                        <div><strong>Msg:</strong> <Small>{l.message}</Small></div>
                        {l.response && <div><strong>Resp:</strong> <Small>{l.response}</Small></div>}
                        {l.errorMessage && <div><strong>Erro:</strong> <Small>{l.errorMessage}</Small></div>}
                      </div>
                      <Small>{typeof l.processingTime === 'number' ? `${l.processingTime} ms` : '-'}</Small>
                    </Row>
                  ))}
                </div>
              )}
            </Card>

            <Card>
              <Toolbar>
                <Title style={{ margin: 0 }}>Logs de Acesso</Title>
                <Small>Últimos {accessLogs.length}</Small>
              </Toolbar>
              {loading ? <Small>Carregando...</Small> : (
                <div style={{ maxHeight: 420, overflow: 'auto' }}>
                  {accessLogs.map((l, idx) => (
                    <Row key={l._id || idx}>
                      <div>
                        <div><Small>{l.col_data} {l.col_hora}</Small></div>
                        <div><strong>IP:</strong> <Small>{l.col_IP}</Small></div>
                        <div><strong>Bot:</strong> <Small>{l.col_nome_bot}</Small></div>
                        <div><strong>Ação:</strong> <Small>{l.col_acao}</Small></div>
                      </div>
                    </Row>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}
      </Main>
    </Container>
  );
};

export default AdminPanel;


