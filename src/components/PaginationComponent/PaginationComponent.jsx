
import { Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PaginationComponent = ({page, numberOfPages, handleChange}) => {
  
  return (
    <div>
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination
          count={numberOfPages}
          page={page}
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default PaginationComponent;
