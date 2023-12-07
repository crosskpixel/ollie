import { Box } from "@mui/material";

export const TooltipForNivuCursor = ({ children }: { children: any}) => {
    return (
      <Box sx={{ background: 'white', padding: 1, borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '400px', display:'flex', flexDirection: 'row', justifyContent:'center' }} >
        {children}
      </Box>
    );
  };