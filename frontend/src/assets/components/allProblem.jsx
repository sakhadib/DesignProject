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
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "../../api";

const AllProblems = () => {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("id");
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
        const aValue = orderBy.split('.').reduce((o, i) => o[i], a);
        const bValue = orderBy.split('.').reduce((o, i) => o[i], b);
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
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
        <Collapse in={expanded} collapsedSize={40} timeout="auto">
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
                    (category === "All Problems" &&
                      selectedCategories.length === 0)
                      ? "primary"
                      : "default"
                  }
                  variant={
                    selectedCategories.includes(category) ||
                    (category === "All Problems" &&
                      selectedCategories.length === 0)
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
                <TableHeader label="ID" property="id" />
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
                    key={problem.id}
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
                    <TableCell>{problem.id}</TableCell>
                    <TableCell><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {problem.title}
                                                                        </ReactMarkdown></TableCell>
                    <TableCell>{problem.xp}</TableCell>
                    <TableCell>{problem.tags.target}</TableCell>
                    <TableCell>{problem.tags.topics.join(", ")}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredAndSortedProblems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: "#1565C0",
            color: "white",
            "& .MuiTablePagination-actions": {
              color: "white",
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              color: "white",
            },
            "& .MuiTablePagination-select": {
              color: "white",
            },
            "& .MuiTablePagination-selectIcon": {
              color: "white",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default AllProblems;
