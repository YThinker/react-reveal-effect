import { Box, Typography } from '@mui/material';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}
const SectionTitle = (props: SectionTitleProps) => {
  const { title, subtitle } = props;

  return (
    <Box sx={(theme) => ({
      color: "#fff",
      marginBottom: "5vh",
      [theme.breakpoints.down("sm")]: {
        textAlign: 'center'
      }
    })}>
      <Typography variant="h4"
        sx={{ marginBottom: "0.5em", fontWeight: 500 }}
      >{title}</Typography>
      {subtitle && <Typography variant="subtitle1"
        sx={{ fontSize: "1.4em", maxWidth: 600}}
      >{subtitle}</Typography>}
    </Box>
  )
}

export default SectionTitle;