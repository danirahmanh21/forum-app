/* eslint-disable linebreak-style */
import styled from 'styled-components';

export const Form = styled.form`
  max-width: 400px;
  margin: 2rem auto;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  background-color: var(--secondary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary);
  }
`;