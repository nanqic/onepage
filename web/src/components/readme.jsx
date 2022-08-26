import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import GitHubIcon from '@mui/icons-material/GitHub';
import {Link} from "@mui/material";


export default function Readme() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pt: 2,
                    pb: 5
                }}>
                    <DialogTitle>使用说明</DialogTitle>
                    <Typography variant="subtitle2" component="div" sx={{
                        p: 2,
                        VerticalAlign: 'top',
                    }}>
                        1. 打开一页纸，未设置密码时，任何人都可以访问、编辑、添加密码或销毁 <br/>
                        2. 分享带密码的纸张时，分享出去的内容与纸张内容同步<br/>
                        3. 目前站点处于测试阶段，部署在免费的PaaS上，数据可能丢失<br/><br/>
                        <PriorityHighIcon /> 请勿在此存储重要内容，本站不对纸张内容安全和可访问性做保证。
                    </Typography>
                    <Button variant="contained" onClick={handleClose}
                            sx={{width: 120}}>
                        我已知晓
                    </Button>
                </Box>
            </Dialog>

            <Button variant="text" onClick={handleClickOpen}>
                使用须知
            </Button>
        </>
    );
}
