/* eslint-disable import/extensions */
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { AppShell } from '@mantine/core';
import { RootState } from '@/store';
import { Header } from '@/components/header/Header';
import { SellerSidebar } from '@/components/sellerSidebar/SellerSidebar';

export default function SellerProtectedRoute() {
  const user:any = useSelector((state:RootState) => state.user.data);
  const [opened] = useDisclosure();

  console.log(user);

  return (
    user.type === 'Seller' ?
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <SellerSidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      </AppShell>
    </> : <Navigate to="/" />
  );
}
