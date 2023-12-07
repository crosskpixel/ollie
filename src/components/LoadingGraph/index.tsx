import { Box } from "@mui/material"


export const LoadingGraph = ({ loading, children } : { loading: boolean, children: any }) => {

    if(loading) {
        return <Box p={3} >
            <span style={{ fontSize: 15, fontStyle: 'italic'}} >Carregando...</span>
        </Box>
    }
    return children;

}