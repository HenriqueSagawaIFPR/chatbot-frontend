import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  background-color: rgba(233, 69, 96, 0.1);
  border-left: 4px solid ${props => props.theme.colors.text};
  border-radius: 4px;
  color: ${props => props.theme.colors.lightText};
`;

const ErrorMessage = ({ message }) => {
  return (
    <ErrorContainer>
      <p>{message || "Ocorreu um erro na comunicação com o servidor. Por favor, tente novamente."}</p>
    </ErrorContainer>
  );
};

export default ErrorMessage;
