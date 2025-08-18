import React from 'react';
import styled from 'styled-components';
import BotInfo from './BotInfo';
import { FaTrash, FaPencilAlt } from "react-icons/fa";

const SidebarContainer = styled.aside`
  width: 320px;
  height: 100vh;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.lightText};
    border-radius: 3px;
  }
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const ChatList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex-grow: 1;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.lightText};
    border-radius: 2px;
  }
`;

const ChatListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.95rem;
  color: ${props => props.theme.colors.lightText};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
  }

  &.active {
    background-color: ${props => props.theme.colors.accent};
    color: white;
    font-weight: 500;
  }
`;

const ChatTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.lightText};
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  flex-shrink: 0;

  ${ChatListItem}:hover & {
    display: inline-flex;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
`;

const NewChatButton = styled.button`
    background-color: ${props => props.theme.colors.accent};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-1px);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(0,0,0,0.07);
  margin: 1rem 0 1.25rem 0;
`;

const Sidebar = ({ chats, onSelectChat, onNewChat, activeChatId, onRequestDelete, onRequestRename }) => {
  return (
    <SidebarContainer>
      <BotInfo />
      <SidebarContent>
        <SidebarHeader>Conversas</SidebarHeader>
        <NewChatButton onClick={onNewChat}>+ Nova Conversa</NewChatButton>
        <Divider />
        <ChatList>
          {chats && chats.length === 0 && (
            <li style={{ color: '#bbb', padding: '1rem 0', fontSize: '0.95rem' }}>Nenhuma conversa encontrada.</li>
          )}
          {chats && chats.map(chat => (
            <ChatListItem 
              key={chat._id}
              className={chat._id === activeChatId ? 'active' : ''}
              onClick={() => onSelectChat(chat._id)}
            >
              <ChatTitle>{chat.title}</ChatTitle>
              <Actions>
                <IconButton
                  aria-label="Renomear conversa"
                  title="Renomear conversa"
                  onClick={(e) => { e.stopPropagation(); onRequestRename?.(chat); }}
                >
                  <FaPencilAlt size={16} />
                </IconButton>
                <IconButton
                  aria-label="Excluir conversa"
                  title="Excluir conversa"
                  onClick={(e) => { e.stopPropagation(); onRequestDelete?.(chat); }}
                >
                  <FaTrash size={16} />
                </IconButton>
              </Actions>
            </ChatListItem>
          ))}
        </ChatList>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;

