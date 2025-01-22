// import React, { useState, useEffect, useMemo } from "react";
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
//   Button,
//   Grid,
//   Chip,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api";

// const AllProblems = () => {
//   const [problems, setProblems] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(25);
//   const [order, setOrder] = useState("asc");
//   const [orderBy, setOrderBy] = useState("title");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [expanded, setExpanded] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const response = await axios.get("/problem/all");
//         setProblems(response.data.problems || []);
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleRequestSort = (property) => (event) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleCategoryToggle = (category) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category)
//         : [...prev, category]
//     );
//     setPage(0);
//   };

//   const handleToggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   const categoryCounts = useMemo(() => {
//     const counts = {};
//     problems.forEach((problem) => {
//       problem.tags.topics.forEach((topic) => {
//         counts[topic] = (counts[topic] || 0) + 1;
//       });
//     });
//     return counts;
//   }, [problems]);

//   const categories = useMemo(() => {
//     return ["All Problems", ...Object.keys(categoryCounts)];
//   }, [categoryCounts]);

//   const filteredAndSortedProblems = useMemo(() => {
//     return problems
//       .filter((problem) => {
//         const matchesSearchTerm = problem.title
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase());
//         const matchesCategory =
//           selectedCategories.length === 0 ||
//           selectedCategories.some((category) =>
//             problem.tags.topics.includes(category)
//           );
//         return matchesSearchTerm && matchesCategory;
//       })
//       .sort((a, b) => {
//         if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
//         if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
//         return 0;
//       });
//   }, [problems, searchTerm, selectedCategories, order, orderBy]);

//   const TableHeader = ({ label, property }) => (
//     <TableCell
//       sx={{
//         backgroundColor: "#1565C0",
//         color: "white",
//         fontWeight: "bold",
//       }}
//     >
//       <TableSortLabel
//         active={orderBy === property}
//         direction={orderBy === property ? order : "asc"}
//         onClick={handleRequestSort(property)}
//         sx={{
//           "& .MuiTableSortLabel-icon": {
//             color: "white !important",
//           },
//           color: "white !important",
//         }}
//       >
//         {label}
//       </TableSortLabel>
//     </TableCell>
//   );

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Box
//         sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
//       >
//         <Typography variant="h4">All Problems</Typography>
//         <TextField
//           variant="outlined"
//           size="small"
//           placeholder="Search problems..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ color: "action.active", mr: 1 }} />,
//           }}
//         />
//       </Box>

//       <Box
//         sx={{
//           mb: 2,
//           p: 2,
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           backgroundColor: "#f8f9fa",
//           overflowY: expanded ? "auto" : "hidden",
//           maxHeight: expanded ? "300px" : "60px",
//         }}
//       >
//         <Grid container spacing={1} wrap={expanded ? "wrap" : "nowrap"}>
//           {categories.map((category) => (
//             <Grid item key={category}>
//               <Chip
//                 label={
//                   category === "All Problems"
//                     ? "All Problems"
//                     : `${category} (${categoryCounts[category] || 0})`
//                 }
//                 onClick={() =>
//                   category === "All Problems"
//                     ? setSelectedCategories([])
//                     : handleCategoryToggle(category)
//                 }
//                 color={
//                   selectedCategories.includes(category) ||
//                   (category === "All Problems" && selectedCategories.length === 0)
//                     ? "primary"
//                     : "default"
//                 }
//                 variant={
//                   selectedCategories.includes(category) ||
//                   (category === "All Problems" && selectedCategories.length === 0)
//                     ? "filled"
//                     : "outlined"
//                 }
//                 sx={{ cursor: "pointer" }}
//               />
//             </Grid>
//           ))}
//         </Grid>
//         <Box textAlign="center" mt={2}>
//           <Button onClick={handleToggleExpand} variant="text">
//             {expanded ? "Collapse ▲" : "Expand ▼"}
//           </Button>
//         </Box>
//       </Box>

//       <Paper sx={{ width: "100%", mb: 2 }}>
//         <TableContainer>
//           <Table sx={{ minWidth: 650 }} aria-label="all problems table">
//             <TableHead>
//               <TableRow>
//                 <TableHeader label="Title" property="title" />
//                 <TableHeader label="XP" property="xp" />
//                 <TableHeader label="Target" property="tags.target" />
//                 <TableHeader label="Topics" property="tags.topics" />
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredAndSortedProblems
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((problem, index) => (
//                   <TableRow
//                     key={index}
//                     hover
//                     onClick={() => navigate(`/problem/${problem.id}`)}
//                     sx={{
//                       cursor: "pointer",
//                       backgroundColor:
//                         index % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternate row colors
//                       "&:hover": {
//                         backgroundColor: "#f1f1f1",
//                       },
//                     }}
//                   >
//                     <TableCell>{problem.title}</TableCell>
//                     <TableCell>{problem.xp}</TableCell>
//                     <TableCell>{problem.tags.target}</TableCell>
//                     <TableCell>{problem.tags.topics.join(", ")}</TableCell>
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

// ================================================================================================================================================






















import React, { useState, useEffect, useMemo } from "react";
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
  Button,
  Grid,
  Chip,
  Box,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "../../api";

const AllProblems = () => {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("/problem/all");
        setProblems(response.data.problems || []);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setPage(0);
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const categoryCounts = useMemo(() => {
    const counts = {};
    problems.forEach((problem) => {
      problem.tags.topics.forEach((topic) => {
        counts[topic] = (counts[topic] || 0) + 1;
      });
    });
    return counts;
  }, [problems]);

  const categories = useMemo(() => {
    return ["All Problems", ...Object.keys(categoryCounts)];
  }, [categoryCounts]);

  const filteredAndSortedProblems = useMemo(() => {
    return problems
      .filter((problem) => {
        const matchesSearchTerm = problem.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.some((category) =>
            problem.tags.topics.includes(category)
          );
        return matchesSearchTerm && matchesCategory;
      })
      .sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
        return 0;
      });
  }, [problems, searchTerm, selectedCategories, order, orderBy]);

  const TableHeader = ({ label, property }) => (
    <TableCell
      sx={{
        backgroundColor: "#1565C0",
        color: "white",
        fontWeight: "bold",
      }}
    >
      <TableSortLabel
        active={orderBy === property}
        direction={orderBy === property ? order : "asc"}
        onClick={handleRequestSort(property)}
        sx={{
          "& .MuiTableSortLabel-icon": {
            color: "white !important",
          },
          color: "white !important",
        }}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">All Problems</Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "action.active", mr: 1 }} />,
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Collapse in={expanded} collapsedSize={40}>
          <Grid container spacing={1}>
            {categories.map((category) => (
              <Grid item key={category}>
                <Chip
                  label={
                    category === "All Problems"
                      ? "All Problems"
                      : `${category} (${categoryCounts[category] || 0})`
                  }
                  onClick={() =>
                    category === "All Problems"
                      ? setSelectedCategories([])
                      : handleCategoryToggle(category)
                  }
                  color={
                    selectedCategories.includes(category) ||
                    (category === "All Problems" && selectedCategories.length === 0)
                      ? "primary"
                      : "default"
                  }
                  variant={
                    selectedCategories.includes(category) ||
                    (category === "All Problems" && selectedCategories.length === 0)
                      ? "filled"
                      : "outlined"
                  }
                  sx={{ cursor: "pointer" }}
                />
              </Grid>
            ))}
          </Grid>
        </Collapse>
        <Box textAlign="center" mt={2}>
          <Button onClick={handleToggleExpand} variant="text">
            {expanded ? "Collapse ▲" : "Expand ▼"}
          </Button>
        </Box>
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="all problems table">
            <TableHead>
              <TableRow>
                <TableHeader label="Title" property="title" />
                <TableHeader label="XP" property="xp" />
                <TableHeader label="Target" property="tags.target" />
                <TableHeader label="Topics" property="tags.topics" />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedProblems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((problem, index) => (
                  <TableRow
                    key={index}
                    hover
                    onClick={() => navigate(`/problem/single/${problem.id}`)}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        index % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternate row colors
                      "&:hover": {
                        backgroundColor: "#f1f1f1",
                      },
                    }}
                  >
                    <TableCell>{problem.title}</TableCell>
                    <TableCell>{problem.xp}</TableCell>
                    <TableCell>{problem.tags.target}</TableCell>
                    <TableCell>{problem.tags.topics.join(", ")}</TableCell>
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
          sx={{
            backgroundColor: "#1565C0",
            color: "white", // Changes text color to white
            "& .MuiTablePagination-actions": {
              color: "white", // Ensures pagination controls are visible
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              color: "white", // Ensures labels and displayed rows are visible
            },
            "& .MuiTablePagination-select": {
              color: "white", // Changes the dropdown text color
            },
            "& .MuiTablePagination-selectIcon": {
              color: "white", // Changes the dropdown arrow color
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default AllProblems;
