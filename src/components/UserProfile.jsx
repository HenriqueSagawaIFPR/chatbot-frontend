import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #2d3748;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 500;
  color: #4a5568;
`;

const Value = styled.span`
  color: #2d3748;
`;

const EditButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #5a67d8;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &.primary {
    background: #667eea;
    color: white;

    &:hover {
      background: #5a67d8;
    }
  }

  &.secondary {
    background: #e2e8f0;
    color: #4a5568;

    &:hover {
      background: #cbd5e0;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  background: #fed7d7;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 15px;
`;

const SuccessMessage = styled.div`
  color: #38a169;
  background: #c6f6d5;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 15px;
`;

const LogoutButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background: #c53030;
  }
`;

const UserProfile = () => {
  const { user, logout, updateUserProfile, changeUserPassword } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileData, setProfileData] = useState({ username: user?.username || '' });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateUserProfile(profileData);
      setSuccess('Perfil atualizado com sucesso!');
      setIsEditingProfile(false);
    } catch (err) {
      setError(err.error || 'Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await changeUserPassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setSuccess('Senha alterada com sucesso!');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.error || 'Erro ao alterar senha');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditingProfile(false);
    setIsChangingPassword(false);
    setProfileData({ username: user?.username || '' });
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <Title>Perfil do Usuário</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        {!isEditingProfile ? (
          <>
            <InfoRow>
              <Label>Nome de Usuário:</Label>
              <Value>{user.username}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Email:</Label>
              <Value>{user.email}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Membro desde:</Label>
              <Value>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Último login:</Label>
              <Value>{new Date(user.lastLogin).toLocaleDateString('pt-BR')}</Value>
            </InfoRow>
            
            <ButtonGroup style={{ marginTop: '20px' }}>
              <EditButton onClick={() => setIsEditingProfile(true)}>
                Editar Perfil
              </EditButton>
              <EditButton onClick={() => setIsChangingPassword(true)}>
                Alterar Senha
              </EditButton>
            </ButtonGroup>
          </>
        ) : (
          <Form onSubmit={handleProfileSubmit}>
            <InputGroup>
              <Label>Nome de Usuário:</Label>
              <Input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ username: e.target.value })}
                required
                minLength="3"
                maxLength="30"
              />
            </InputGroup>
            
            <ButtonGroup>
              <Button type="submit" className="primary" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button type="button" className="secondary" onClick={cancelEdit}>
                Cancelar
              </Button>
            </ButtonGroup>
          </Form>
        )}

        {isChangingPassword && (
          <Form onSubmit={handlePasswordSubmit}>
            <InputGroup>
              <Label>Senha Atual:</Label>
              <Input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Nova Senha:</Label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
                minLength="6"
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Confirmar Nova Senha:</Label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
                minLength="6"
              />
            </InputGroup>
            
            <ButtonGroup>
              <Button type="submit" className="primary" disabled={isLoading}>
                {isLoading ? 'Alterando...' : 'Alterar Senha'}
              </Button>
              <Button type="button" className="secondary" onClick={cancelEdit}>
                Cancelar
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </ProfileCard>

      <ProfileCard>
        <LogoutButton onClick={logout}>
          Sair da Conta
        </LogoutButton>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default UserProfile;
