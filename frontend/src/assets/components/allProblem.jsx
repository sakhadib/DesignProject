// import React, { useState, useMemo } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   TableSortLabel,
//   Typography,
//   Container,
//   TextField,
//   Box,
//   Chip,
//   Stack
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const problems = [
//   {
//     id: 1,
//     title: "Test Problem 1",
//     author: "avro",
//     category: "simpleMath",
//     created_at: "2024-11-03T09:54:52.681262Z",
//     updated_at: "2024-11-03T12:43:31.880479Z"
//   },
//   {
//     id: 2,
//     title: "Advanced Algebra",
//     author: "mathwhiz",
//     category: "algebra",
//     created_at: "2024-11-04T10:00:00.000000Z",
//     updated_at: "2024-11-04T11:30:00.000000Z"
//   },
//   {
//     id: 3,
//     title: "Geometry Basics",
//     author: "shapemaster",
//     category: "geometry",
//     created_at: "2024-11-05T14:30:00.000000Z",
//     updated_at: "2024-11-05T15:45:00.000000Z"
//   },

//   {
//     id: 4,
//     title: "Test Problem 2",
//     author: "avro",
//     category: "simpleMath",
//     created_at: "2024-11-03T09:54:52.681262Z",
//     updated_at: "2024-11-03T12:43:31.880479Z"
//   },

//   {
//     id: 5,
//     title: "Test Problem 3",
//     author: "avro",
//     category: "simpleMath",
//     created_at: "2024-11-03T09:54:52.681262Z",
//     updated_at: "2024-11-03T12:43:31.880479Z"
//   },

//   {
//     id: 6,
//     title: "Test Problem 4",
//     author: "shapemaster",
//     category: "geometry",
//     created_at: "2024-11-05T14:30:00.000000Z",
//     updated_at: "2024-11-05T15:45:00.000000Z"
//   }
// ];

// const AllProblems = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(25);
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('id');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleRequestSort = (property) => (event) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category === "All Problems" ? '' : category);
//     setPage(0);
//   };

//   const filteredAndSortedProblems = useMemo(() => {
//     return problems
//       .filter((problem) => 
//         problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         (selectedCategory === '' || problem.category === selectedCategory)
//       )
//       .sort((a, b) => {
//         if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
//         if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
//         return 0;
//       });
//   }, [searchTerm, selectedCategory, order, orderBy]);

//   const TableHeader = ({ label, property }) => (
//     <TableCell>
//       <TableSortLabel
//         active={orderBy === property}
//         direction={orderBy === property ? order : 'asc'}
//         onClick={handleRequestSort(property)}
//       >
//         {label}
//       </TableSortLabel>
//     </TableCell>
//   );

//   const categories = ["All Problems",...new Set(problems.map(problem => problem.category))];

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h4">
//           All Problems
//         </Typography>
//         <TextField
//           variant="outlined"
//           size="small"
//           placeholder="Search problems..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
//           }}
//         />
//       </Box>
      
//       <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//         {categories.map((category) => (
//           <Chip
//             key={category}
//             label={category}
//             onClick={() => handleCategoryClick(category)}
//             color={selectedCategory === category ? "primary" : "default"}
//             variant={selectedCategory === category ? "filled" : "outlined"}
//           />
//         ))}
//       </Stack>

//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <TableContainer>
//           <Table sx={{ minWidth: 650 }} aria-label="all problems table">
//             <TableHead>
//               <TableRow>
//                 <TableHeader label="ID" property="id" />
//                 <TableHeader label="Title" property="title" />
//                 <TableHeader label="Author" property="author" />
//                 <TableHeader label="Category" property="category" />
//                 <TableHeader label="Created At" property="created_at" />
//                 <TableHeader label="Updated At" property="updated_at" />
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredAndSortedProblems
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((problem) => (
//                   <TableRow key={problem.id} hover>
//                     <TableCell>{problem.id}</TableCell>
//                     <TableCell>{problem.title}</TableCell>
//                     <TableCell>{problem.author}</TableCell>
//                     <TableCell>{problem.category}</TableCell>
//                     <TableCell>{new Date(problem.created_at).toLocaleString()}</TableCell>
//                     <TableCell>{new Date(problem.updated_at).toLocaleString()}</TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[25, 50, 100]}
//           component="div"
//           count={filteredAndSortedProblems.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Container>
//   );
// };

// export default AllProblems;



// import React, { useState, useMemo } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   TableSortLabel,
//   Typography,
//   Container,
//   TextField,
//   Box,
//   Chip,
//   Stack
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const problems = [
//   {
//     id: 1,
//     title: "Test Problem 1",
//     author: "avro",
//     category: "simpleMath",
//     created_at: "2024-11-03T09:54:52.681262Z",
//     updated_at: "2024-11-03T12:43:31.880479Z"
//   },
  
//   {
//     id: 2,
//     title: "Advanced Algebra",
//     author: "mathwhiz",
//     category: "algebra",
//     created_at: "2024-11-04T10:00:00.000000Z",
//     updated_at: "2024-11-04T11:30:00.000000Z"
//   },

//   {
//     id: 3,
//     title: "Geometry Basics",
//     author: "shapemaster",
//     category: "geometry",
//     created_at: "2024-11-05T14:30:00.000000Z",
//     updated_at: "2024-11-05T15:45:00.000000Z"
//   },

//   {
//     id: 4,
//     title: "Test Problem 2",
//     author: "avro",
//     category: "simpleMath",
//     created_at: "2024-11-03T09:54:52.681262Z",
//     updated_at: "2024-11-03T12:43:31.880479Z"
//   },

//   {
//     id: 5,
//     title: "Test Problem 3",
//     author: "avro",
//     category: "simpleMath",
//     created_at: "2024-11-03T09:54:52.681262Z",
//     updated_at: "2024-11-03T12:43:31.880479Z"
//   },

//   {
//     id: 6,
//     title: "Test Problem 4",
//     author: "shapemaster",
//     category: "geometry",
//     created_at: "2024-11-05T14:30:00.000000Z",
//     updated_at: "2024-11-05T15:45:00.000000Z"
//   }
// ];

// const AllProblems = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(25);
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('id');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleRequestSort = (property) => (event) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category === "All Problems" ? '' : category);
//     setPage(0);
//   };

//   const filteredAndSortedProblems = useMemo(() => {
//     return problems
//       .filter((problem) => 
//         problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         (selectedCategory === '' || problem.category === selectedCategory)
//       )
//       .sort((a, b) => {
//         if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
//         if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
//         return 0;
//       });
//   }, [searchTerm, selectedCategory, order, orderBy]);

//   const TableHeader = ({ label, property }) => (
//     <TableCell>
//       <TableSortLabel
//         active={orderBy === property}
//         direction={orderBy === property ? order : 'asc'}
//         onClick={handleRequestSort(property)}
//       >
//         {label}
//       </TableSortLabel>
//     </TableCell>
//   );

//   const categories = ["All Problems", ...new Set(problems.map(problem => problem.category))];

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h4">
//           All Problems
//         </Typography>
//         <TextField
//           variant="outlined"
//           size="small"
//           placeholder="Search problems..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
//           }}
//         />
//       </Box>
      
//       <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//         {categories.map((category) => (
//           <Chip
//             key={category}
//             label={category}
//             onClick={() => handleCategoryClick(category)}
//             color={selectedCategory === category ? "primary" : "default"}
//             variant={selectedCategory === category ? "filled" : "outlined"}
//           />
//         ))}
//       </Stack>

//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <TableContainer>
//           <Table sx={{ minWidth: 650 }} aria-label="all problems table">
//             <TableHead>
//               <TableRow>
//                 <TableHeader label="ID" property="id" />
//                 <TableHeader label="Title" property="title" />
//                 <TableHeader label="Author" property="author" />
//                 <TableHeader label="Category" property="category" />
//                 <TableHeader label="Created At" property="created_at" />
//                 <TableHeader label="Updated At" property="updated_at" />
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredAndSortedProblems
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((problem) => (
//                   <TableRow key={problem.id} hover>
//                     <TableCell>{problem.id}</TableCell>
//                     <TableCell>{problem.title}</TableCell>
//                     <TableCell>{problem.author}</TableCell>
//                     <TableCell>{problem.category}</TableCell>
//                     <TableCell>{new Date(problem.created_at).toLocaleString()}</TableCell>
//                     <TableCell>{new Date(problem.updated_at).toLocaleString()}</TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[25, 50, 100]}
//           component="div"
//           count={filteredAndSortedProblems.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Container>
//   );
// };

// export default AllProblems;


import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Typography,
  Container,
  TextField,
  Box,
  Chip,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const problems = [
  {
        id: 1,
        title: "Test Problem 1",
        author: "avro",
        category: "simpleMath",
        created_at: "2024-11-03T09:54:52.681262Z",
        updated_at: "2024-11-03T12:43:31.880479Z"
      },
      
      {
        id: 2,
        title: "Advanced Algebra",
        author: "mathwhiz",
        category: "algebra",
        created_at: "2024-11-04T10:00:00.000000Z",
        updated_at: "2024-11-04T11:30:00.000000Z"
      },
    
      {
        id: 3,
        title: "Geometry Basics",
        author: "shapemaster",
        category: "geometry",
        created_at: "2024-11-05T14:30:00.000000Z",
        updated_at: "2024-11-05T15:45:00.000000Z"
      },
    
      {
        id: 4,
        title: "Test Problem 2",
        author: "avro",
        category: "simpleMath",
        created_at: "2024-11-03T09:54:52.681262Z",
        updated_at: "2024-11-03T12:43:31.880479Z"
      },
    
      {
        id: 5,
        title: "Test Problem 3",
        author: "avro",
        category: "simpleMath",
        created_at: "2024-11-03T09:54:52.681262Z",
        updated_at: "2024-11-03T12:43:31.880479Z"
      },
    
      {
        id: 6,
        title: "Test Problem 4",
        author: "shapemaster",
        category: "geometry",
        created_at: "2024-11-05T14:30:00.000000Z",
        updated_at: "2024-11-05T15:45:00.000000Z"
      }
];

const AllProblems = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "All Problems" ? '' : category);
    setPage(0);
  };

  const filteredAndSortedProblems = useMemo(() => {
    return problems
      .filter((problem) => 
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || problem.category === selectedCategory)
      )
      .sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        return 0;
      });
  }, [searchTerm, selectedCategory, order, orderBy]);

  const TableHeader = ({ label, property }) => (
    <TableCell>
      <TableSortLabel
        active={orderBy === property}
        direction={orderBy === property ? order : 'asc'}
        onClick={handleRequestSort(property)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );

  const categories = ["All Problems", ...new Set(problems.map(problem => problem.category))];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header and Search */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">
          All Problems
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
        />
      </Box>
      
      {/* Category Filter */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
            color={selectedCategory === category ? "primary" : "default"}
            variant={selectedCategory === category ? "filled" : "outlined"}
          />
        ))}
      </Stack>

      {/* Problems Table */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="all problems table">
            <TableHead>
              <TableRow>
                <TableHeader label="ID" property="id" />
                <TableHeader label="Title" property="title" />
                <TableHeader label="Author" property="author" />
                <TableHeader label="Category" property="category" />
                <TableHeader label="Created At" property="created_at" />
                <TableHeader label="Updated At" property="updated_at" />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedProblems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((problem) => (
                  <TableRow 
                    key={problem.id} 
                    hover 
                    onClick={() => navigate(`/individualproblem/${problem.id}`)} // Redirect on row click
                    style={{ cursor: 'pointer' }} // Make it look clickable
                  >
                    <TableCell>{problem.id}</TableCell>
                    <TableCell>{problem.title}</TableCell>
                    <TableCell>{problem.author}</TableCell>
                    <TableCell>{problem.category}</TableCell>
                    <TableCell>{new Date(problem.created_at).toLocaleString()}</TableCell>
                    <TableCell>{new Date(problem.updated_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={filteredAndSortedProblems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default AllProblems;
