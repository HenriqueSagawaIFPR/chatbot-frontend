import React from 'react';
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
  justify-content: flex-end;
  gap: 8px;
  background: ${props => props.theme.colors.secondary};
  border-top: 1px solid rgba(0,0,0,0.06);
`;

const Button = styled.button`
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  font-weight: 500;
  cursor: pointer;
  transition: filter .15s ease;
  color: #fff;
  background: ${props => props.danger ? props.theme.colors.error : props.theme.colors.accent};

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

const ConfirmModal = ({ title, description, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', onCancel, onConfirm, variant = 'default' }) => {
  return (
    <Backdrop onClick={onCancel}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <Header>{title}</Header>
        <Body>{description}</Body>
        <Footer>
          <GhostButton onClick={onCancel}>{cancelLabel}</GhostButton>
          <Button danger={variant === 'danger'} onClick={onConfirm}>{confirmLabel}</Button>
        </Footer>
      </ModalCard>
    </Backdrop>
  );
};

export default ConfirmModal;

