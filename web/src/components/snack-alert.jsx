import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * style: info, warning,error,success
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function SnackAlert(props) {
    const { open: shouldOpen, style, info } = props
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
        setOpen(shouldOpen)
    }, [props])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} sx={{ width: '100%' }} severity={style}>
                    {info}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
