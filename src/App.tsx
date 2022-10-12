import { lazy } from 'react';
import Container from '@mui/joy/Container';

import ModeToggle from './components/modeToggle';

const TableArrangement = lazy(() => import('./features/tableArrangement'));

function App() {
  return (
    <Container maxWidth='xl'>
      <ModeToggle />
      <TableArrangement />
    </Container>
  );
}

export default App;
