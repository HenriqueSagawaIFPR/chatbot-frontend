import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ResponsiveContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SidebarWrapper = styled.div`
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${props => props.isOpen ? '2px 0 10px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
`;

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 80px;
  }
`;

const ResponsiveLayout = ({ sidebar, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ResponsiveContainer>
      {isMobile && (
        <MobileToggle onClick={toggleSidebar}>
          {isSidebarOpen ? '✕' : '☰'}
        </MobileToggle>
      )}
      
      <Overlay isOpen={isSidebarOpen} onClick={closeSidebar} />
      
      <SidebarWrapper isOpen={isSidebarOpen}>
        {sidebar}
      </SidebarWrapper>
      
      <MainWrapper>
        {children}
      </MainWrapper>
    </ResponsiveContainer>
  );
};

export default ResponsiveLayout;

