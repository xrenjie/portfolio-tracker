import { useState } from 'react';
import { LeftNav } from './LeftNav';
import { DashboardLayout } from '../../general/layout';
import { ExpenseDashboardContent } from './ExpenseDashboardContent';
import { DASHBOARDS } from './constants';
import { UserPanel } from './UserPanel';

export function ExpenseDashboard() {
  const { navState, setNav } = useNavState();

  return (
    <DashboardLayout
      left={<LeftNav navState={navState} setNav={setNav} />}
      middle={<ExpenseDashboardContent dashboardType={navState} />}
      right={<UserPanel />}
    />
  );
}

const useNavState = () => {
  const [navState, setNavState] = useState(DASHBOARDS.ALL);

  const setNav = (nav) => {
    setNavState(nav);
  };

  return { navState, setNav };
};
