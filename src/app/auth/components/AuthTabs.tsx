import { Tabs, Tab, Paper } from '@mui/material';
import { AuthTab } from '../types/authTypes';

interface AuthTabsProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

export function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue as AuthTab);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: '12px 12px 0 0' }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="fullWidth"
        sx={{
          '& .MuiTabs-indicator': {
            height: 3,
          },
        }}
      >
        <Tab label="Login" sx={{ fontWeight: 'medium', py: 2 }} />
        <Tab label="Cadastro" sx={{ fontWeight: 'medium', py: 2 }} />
      </Tabs>
    </Paper>
  );
}

