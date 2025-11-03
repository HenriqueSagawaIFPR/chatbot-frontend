import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userGetBotConfig, userUpdateBotConfig } from '../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const Small = styled.div`
  font-size: 12px;
  color: ${p => p.theme.colors.lightText};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 260px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.1);
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background: ${p => (p.$variant === 'primary' ? p.theme.colors.accent : 'transparent')};
  color: ${p => (p.$variant === 'primary' ? 'white' : p.theme.colors.text)};
  border: 1px solid ${p => (p.$variant === 'primary' ? p.theme.colors.accent : 'rgba(0,0,0,0.1)')};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

export default function UserBotConfig({ onBack }) {
  const [value, setValue] = useState('');
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const cfg = await userGetBotConfig();
        setValue(cfg.systemInstruction || '');
        setUpdatedAt(cfg.updatedAt || null);
      } catch (e) {
        setError(e.error || 'Erro ao carregar configuração');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const saved = await userUpdateBotConfig(value);
      setUpdatedAt(saved.updatedAt || new Date().toISOString());
      setSuccess('Sua personalidade foi salva e irá sobrepor a padrão.');
    } catch (e) {
      setError(e.error || 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Title>Minha Personalidade do Bot</Title>
        <Button onClick={onBack}>← Voltar</Button>
      </Row>
      {updatedAt && <Small>Atualizado: {new Date(updatedAt).toLocaleString()}</Small>}
      <Small>Edite sua própria system instruction. Ela vale somente para você e sobrepõe a global.</Small>
      {error && <Small style={{ color: '#c53030' }}>{error}</Small>}
      {success && <Small style={{ color: '#2f855a' }}>{success}</Small>}
      {loading ? (
        <Small>Carregando...</Small>
      ) : (
        <>
          <TextArea value={value} onChange={(e) => { setValue(e.target.value); setSuccess(''); }} />
          <Row>
            <Button $variant="primary" onClick={handleSave}>Salvar</Button>
            <Button onClick={() => setValue('')}>Limpar</Button>
          </Row>
        </>
      )}
    </Container>
  );
}


