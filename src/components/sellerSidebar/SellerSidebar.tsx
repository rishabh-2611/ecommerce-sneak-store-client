import { useState } from 'react';
import { Text } from '@mantine/core';
import {
  IconSettings,
  IconGauge,
  IconCreditCardRefund,
  IconFileInvoice,
  IconPackages,
  IconTruckDelivery,
  IconTruckReturn,
  IconWallet,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './SellerSidebar.module.css';

const data = [
  { isSectionTitle: true, label: 'Overview' },
  { link: 'dashboard', label: 'Dashboard', icon: IconGauge },
  { link: 'products', label: 'Products', icon: IconPackages },
  { link: 'sales', label: 'Sales', icon: IconTruckDelivery },
  { isSectionTitle: true, label: 'Transaction' },
  { link: 'payments', label: 'Payments', icon: IconWallet },
  { link: 'refunds', label: 'Refunds', icon: IconCreditCardRefund },
  { link: 'invoices', label: 'Invoice', icon: IconFileInvoice },
  { link: 'returns', label: 'Returns', icon: IconTruckReturn },
  { isSectionTitle: true, label: 'General' },
  { link: 'settings', label: 'Account Settings', icon: IconSettings },
];

export function SellerSidebar() {
  const [active, setActive] = useState('');

  const links = data.map((item) => (
    item.isSectionTitle ?
      <Text size="sm" ml="sm" my={5} fw={500} c="dimmed" key={item.label}>{item.label}</Text>
    :
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>
    </nav>
  );
}
