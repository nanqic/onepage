import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

export default function InputDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState("");
    const { open: shouldOpen, inputType, title, content, submit: handleSubmit, helperText } = props

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setInput(e.target.value)
    }
    useEffect(() => {
        setOpen(shouldOpen)
    }, [props])

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                    <form>
                        <input type="text" hidden autoComplete="false" />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="请输入"
                            error={helperText!==undefined}
                            helperText={helperText}
                            type={inputType}
                            autoComplete='current-password'
                            fullWidth
                            variant="standard"
                            onChange={(e) => handleChange(e)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={() => { handleSubmit(input); handleClose() }}>确定</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
