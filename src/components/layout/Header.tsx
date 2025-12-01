import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Create as CreateIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  TrendingUp as TrendingIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../utils';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate(ROUTES.LOGIN);
  };

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }
    navigate(ROUTES.POST_CREATE);
  };

  const menuItems = [
    { icon: <HomeIcon />, text: 'Trang chủ', path: ROUTES.HOME },
    { icon: <TrendingIcon />, text: 'Xu hướng', path: ROUTES.TRENDING },
    { icon: <PeopleIcon />, text: 'Theo dõi', path: ROUTES.FOLLOWING },
  ];

  const mobileDrawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
          🐱 Meobeo Talk
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileDrawerOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isAuthenticated && (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleCreatePost}>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Viết bài" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          {/* Mobile Menu */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileDrawerOpen(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              🐱 Meobeo Talk
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, ml: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  sx={{ color: 'text.primary' }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              bgcolor: 'grey.100',
              '&:hover': { bgcolor: 'grey.200' },
              mr: 2,
              width: { xs: 'auto', sm: 250 },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Box
              sx={{
                padding: theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Tìm kiếm..."
              sx={{
                color: 'inherit',
                width: '100%',
                '& .MuiInputBase-input': {
                  padding: theme.spacing(1, 1, 1, 0),
                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  transition: theme.transitions.create('width'),
                },
              }}
              onFocus={() => navigate(ROUTES.SEARCH)}
            />
          </Box>

          {/* Search Icon for mobile */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => navigate(ROUTES.SEARCH)}
            >
              <SearchIcon />
            </IconButton>
          )}

          {/* Create Post Button */}
          {isAuthenticated && !isMobile && (
            <Button
              variant="contained"
              startIcon={<CreateIcon />}
              onClick={handleCreatePost}
              sx={{ mr: 2 }}
            >
              Viết bài
            </Button>
          )}

          {/* Notifications */}
          {isAuthenticated && (
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}

          {/* User Menu */}
          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                <Avatar
                  src={user?.avatar}
                  alt={user?.name}
                  sx={{ width: 36, height: 36 }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                  onClick={() => {
                    navigate(`/profile/${user?.id}`);
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Trang cá nhân</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate(ROUTES.MY_POSTS);
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <CreateIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Bài viết của tôi</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate(ROUTES.SETTINGS);
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cài đặt</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Đăng xuất</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Đăng nhập
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(ROUTES.REGISTER)}
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                Đăng ký
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        {mobileDrawer}
      </Drawer>
    </>
  );
};

export default Header;