// In your ProblemsTable component, modify the TableRow to be clickable:
import { useNavigate } from 'react-router-dom';

// Inside your component:
const navigate = useNavigate();

// In your TableRow:
<TableRow 
  key={problem.id} 
  hover 
  onClick={() => navigate(`/problem/${problem.id}`)}
  style={{ cursor: 'pointer' }}
>
  {/* Your existing TableCell components */}
</TableRow>