import { Fragment, useEffect, useState } from 'react';
import Stack from '@mui/joy/Stack';
import { TextField } from '@mui/joy';
import Button from '@mui/joy/Button';
import Skeleton from '@mui/material/Skeleton';

import { ITableInfoFormProps } from './types';
import useToggle from '../../hooks/useToggle';

const TableInfoForm = ({ submitAddTable, targetTable, isEdit }: ITableInfoFormProps) => {
  const [tableName, setTableName] = useState('');
  const [pax, setPax] = useState(4);
  const [loading, , stopLoading] = useToggle(true);

  useEffect(() => {
    setTableName(targetTable.name);
    setPax(targetTable.number_of_pax);

    stopLoading();
  }, []);

  const handleSubmit = () => {
    submitAddTable({ ...targetTable, name: tableName, number_of_pax: pax });
  };

  return (
    <Stack spacing={2}>
      {loading ? (
        <Fragment>
          <Skeleton variant='text' width={50} />
          <Skeleton width={202} height={50} />
          <Skeleton variant='text' width={50} />
          <Skeleton width='100%' height={50} />
          <Skeleton width='100%' height={50} />
        </Fragment>
      ) : (
        <Fragment>
          <TextField required label='Table name' value={tableName} onChange={({ target }) => setTableName(target.value)} />
          <TextField required label='Pax' type='number' value={pax} onChange={({ target }) => setPax(Number(target.value))} />
          <Button color='success' onClick={handleSubmit}>
            {`${isEdit ? 'Edit' : 'Add'} Table`}
          </Button>
        </Fragment>
      )}
    </Stack>
  );
};

TableInfoForm.defaultProps = {
  isEdit: false
};

export default TableInfoForm;
