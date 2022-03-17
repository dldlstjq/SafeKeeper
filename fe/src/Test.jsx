import styled from "@emotion/styled/";
import { Grid, TextField } from "@mui/material";

export function GridPractice() {
  const XGrid = styled(Grid)`
    border: 5px solid purple;
  `;
  const Div = styled.div`
    // width: 100px;
    height: 100px;
    background-color: white;
    border: solid 3px gold;
  `;
  const Span = styled.span`
    width: 100px;
    height: 100px;
    background-color: green;
  `;

  return (
    <XGrid container>
      <XGrid
        item
        xs={12}
        // display="flex"
        // justifyContent="center"
      >
        <Div>hi</Div>
        <Div>x</Div>
      </XGrid>
      <XGrid item xs={6} display="flex" justifyContent="start">
        <Div>ddd</Div>
      </XGrid>
    </XGrid>
  );
}
