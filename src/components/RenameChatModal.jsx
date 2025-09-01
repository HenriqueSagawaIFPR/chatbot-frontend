import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalCard = styled.div`
  background: #fff;
  color: ${props => props.theme.colors.text};
  width: 90%;
  max-width: 420px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 16px 20px;
  font-weight: 600;
  border-bottom: 1px solid rgba(0,0,0,0.08);
`;

const Body = styled.div`
  padding: 16px 20px;
  color: ${props => props.theme.colors.darkText};
`;

const Footer = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  background: ${props => props.theme.colors.secondary};
  border-top: 1px solid rgba(0,0,0,0.06);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  color: ${props => props.theme.colors.text};
`;

const Button = styled.button`
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  font-weight: 500;
  cursor: pointer;
  transition: filter .15s ease;
  color: #fff;
  background: ${props => props.theme.colors.accent};

  &:hover { filter: brightness(.95); }
`;

const GhostButton = styled.button`
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 6px;
  padding: 10px 14px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: ${props => props.theme.colors.text};

  &:hover { background: rgba(0,0,0,0.04); }
`;

const LeftActions = styled.div`
  display: flex;
  gap: 8px;
`;

const RightActions = styled.div`
  display: flex;
  gap: 8px;
`;

const RenameChatModal = ({ isOpen, initialTitle = '', onCancel, onConfirm, onSuggest }) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    if (isOpen) setTitle(initialTitle || '');
  }, [isOpen, initialTitle]);

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onCancel}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <Header>Renomear conversa</Header>
        <Body>
          <Input
            autoFocus
            value={title}
            placeholder="Digite o novo título"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onConfirm(title.trim());
              if (e.key === 'Escape') onCancel();
            }}
          />
        </Body>
        <Footer>
          <LeftActions>
            {onSuggest && (
              <GhostButton onClick={() => onSuggest()} title="Gerar sugestão de título por IA">Sugestão da IA</GhostButton>
            )}
          </LeftActions>
          <RightActions>
            <GhostButton onClick={onCancel}>Cancelar</GhostButton>
            <Button onClick={() => onConfirm(title.trim())} disabled={!title.trim()}>Salvar</Button>
          </RightActions>
        </Footer>
      </ModalCard>
    </Backdrop>
  );
};

export default RenameChatModal;

