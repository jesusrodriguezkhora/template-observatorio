import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { getColumnType } from "../../columns";
import { TABLE_CONFIG } from "../../config/tables";
import { getDetailPath } from "../../entities/paths";

const headerRowSx = (theme) => ({
  bgcolor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.06)`,
});

function EntityTable({ entity, rows, lookups }) {
  const navigate = useNavigate();
  const { canAccess } = useAuth();
  const columns = entity.columns.filter((column) => canAccess(column.roles));

  function handleRowClick(event, row) {
    if (event.target.closest("a")) {
      return;
    }
    navigate(getDetailPath(entity.key, row.id));
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ borderRadius: TABLE_CONFIG.borderRadius }}
    >
      <Table
        size={TABLE_CONFIG.dense ? "small" : "medium"}
        aria-label={`Listado de ${entity.labels.plural.toLowerCase()}`}
      >
        <TableHead>
          <TableRow sx={headerRowSx}>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                align={column.align}
                sx={{ fontWeight: 600, py: TABLE_CONFIG.headerPaddingY, width: column.width }}
              >
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
              {columns.map((column) => {
                const { Cell } = getColumnType(column.type);
                const value = row[column.field];
                const isEmpty = value === null || value === undefined;

                return (
                  <TableCell key={column.field} align={column.align}>
                    {isEmpty ? (
                      "—"
                    ) : (
                      <Cell
                        value={value}
                        row={row}
                        column={column}
                        entity={entity}
                        lookups={lookups}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EntityTable;