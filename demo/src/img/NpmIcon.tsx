import { SvgIcon, SvgIconProps } from "@mui/material";

const NpmIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 700 700" {...props}>
      <polygon fill="#cb0000" points="0,700 700,700 700,0 0,0"></polygon><polygon fill="#ffffff" points="150,550 350,550 350,250 450,250 450,550 550,550 550,150 150,150 "></polygon>
    </SvgIcon>
  );
}

export default NpmIcon