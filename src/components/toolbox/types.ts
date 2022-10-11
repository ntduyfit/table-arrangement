import { ReactNode } from 'react';

export interface ITableModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
}
