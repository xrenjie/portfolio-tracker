import { DashboardLayout } from '../general/layout';

export function ExpenseDashboard() {
  return (
    <DashboardLayout
      left={<LeftPanel />}
      middle={<>asdf</>}
      right={<RightPanel />}
    />
  );
}

function LeftPanel() {
  return <div>LeftNav</div>;
}

function RightPanel() {
  return <div>right panel</div>;
}
