import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { setCookie } from 'react-use-cookie';


export default function InputDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setCookie(props.seourl, password)
        setOpen(false);
    };
    const handleChange = (e) => {
        setPassword(window.btoa(e.target.value))
    }
    useEffect(() => {
        if (props.open) {
            setOpen(true)
        }
    }, [props])


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>需要密码</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        这张纸被密码保护，请输入密码
                    </DialogContentText>
                    <form>
                        <input type="text" hidden autoComplete="false" />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Input page password"
                            type="password"
                            autoComplete='current-password'
                            fullWidth
                            variant="standard"
                            onChange={(e) => handleChange(e)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleSubmit}>提交</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
