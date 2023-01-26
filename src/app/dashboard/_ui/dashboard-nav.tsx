import { useLogout } from '@app/auth/_hooks';
import { useUserProfile } from '@app/user/_query-hooks';
import { useMemo, useState } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { HistoryEduIcon } from '@common/ui/icons';
import { deepPurple } from '@common/colors';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
} from '@common/ui/atoms';

export function DashboardNav() {
  const user = useUserProfile();
  const logoutStore = useLogout();

  const userInitials = useMemo(() => {
    const first = user.data?.firstName?.[0];
    const last = user.data?.lastName?.[0];
    if (first) {
      return `${first}${last}`.toUpperCase();
    }
  }, [user.data]);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ height: '54px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HistoryEduIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            JobQuest
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {userInitials}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => logoutStore.mutate()}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
