import { Grid, styled, Typography } from '@mui/material';
import React from 'react'

const Image = styled("img")`
  width: 48px;
  height: 48px;
`;

interface ImageGridProps {
  name?: string;
  logo: string;
  version: string;
}
const ImageGrid = (props: ImageGridProps) => {
  return (
    <Grid container item
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{
        width: "unset",
      }}
    >
      <Image src={props.logo} alt={props.name} />
      <Typography variant="body1" color="#fff">{props.version}</Typography>
    </Grid>
  )
}

export default ImageGrid;