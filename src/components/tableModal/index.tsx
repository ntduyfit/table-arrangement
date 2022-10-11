import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';

import { ITableModalProps } from '../toolbox/types';

const TableModal = ({ isOpen, handleClose, children }: ITableModalProps): JSX.Element => {
  return (
    <Modal
      aria-labelledby='modal-title'
      aria-describedby='modal-desc'
      open={isOpen}
      onClose={handleClose}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backdropFilter: 'blur(1px)' }}
    >
      <Sheet
        variant='outlined'
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
          mt: 20
        }}
      >
        <ModalClose />
        {children}
      </Sheet>
    </Modal>
  );
};

export default TableModal;
