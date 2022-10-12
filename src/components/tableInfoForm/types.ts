import { IRectangleTable, ITable } from '../../types/table';
import { Mode } from '../toolbox/constants';

export interface ITableInfoFormProps {
  submitAddTable: (newTable: IRectangleTable) => void;
  targetTable: IRectangleTable;
  isEdit: boolean;
}
