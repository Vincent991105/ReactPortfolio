import { styled } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#36454F",
    fontSize: "18px",
  },
}));

export default CustomTooltip;