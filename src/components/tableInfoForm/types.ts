import { ITable } from '../../types/table';

export interface ITableInfoFormProps {
  submitAddTable: (newTable: ITable) => void;
  targetTable: ITable;
}
