import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import { getDetailPath } from "../../entities/registry";

const headerRowSx = (theme) => ({
  bgcolor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.3)`,
});

function renderCell(entity, column, row, lookups) {
  const value = row[column.field];

  if (value === null || value === undefined) {
    return "—";
  }

  if (column.ref) {
    const label = lookups[column.ref]?.[String(value)] ?? value;
    return (
      <Link component={RouterLink} to={getDetailPath(column.ref, value)} color="inherit" underline="hover">
        {label}
      </Link>
    );
  }

  if (column.field === entity.displayField) {
    return (
      <Link
        component={RouterLink}
        to={getDetailPath(entity.key, row.id)}
        color="inherit"
        underline="hover"
      >
        {value}
      </Link>
    );
  }

  return value;
}

function EntityTable({ entity, rows, lookups }) {
  const navigate = useNavigate();
  const { columns } = entity.browser;

  function handleRowClick(event, row) {
    if (event.target.closest("a")) {
      return;
    }
    navigate(getDetailPath(entity.key, row.id));
  }

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
      <Table size="small" aria-label={`Listado de ${entity.labels.plural.toLowerCase()}`}>
        <TableHead>
          <TableRow sx={headerRowSx}>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ fontWeight: 600, py: 2}}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              hover
              onClick={(event) => handleRowClick(event, row)}
              sx={{ cursor: "pointer" }}
            >
              {columns.map((column) => (
                <TableCell key={column.field}>{renderCell(entity, column, row, lookups)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EntityTable;