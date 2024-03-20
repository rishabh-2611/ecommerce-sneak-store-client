/* eslint-disable import/extensions */
/* eslint-disable max-len, react/jsx-no-undef */

import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    Anchor,
    Divider,
    Center,
    Box,
    Input,
    rem,
    useMantineTheme,
    Image,
    Avatar,
    Menu,
  } from '@mantine/core';
  import { IconChevronDown, IconPackages, IconLogout, IconTruckDelivery, IconSearch, IconSettings, IconShoppingCart } from '@tabler/icons-react';
  import cx from 'clsx';
  import { useDispatch, useSelector } from 'react-redux';
  import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
  import { AppDispatch, RootState } from '@/store';
  import { signOutUser } from '../../store/slices/AuthSlice';
  import classes from './Header.module.css';
  import logo from '../../assets/logo/logo.png';
  import avatar from '../../assets/avatar.jpg';

  const menData = [
    {
      title: 'Boots',
      description: 'Lightweight leather boots for men',
    },
    {
      title: 'Sneakers',
      description: 'A go-to choice for athletic activities',
    },
    {
      title: 'Sandals',
      description: 'Perfect for relaxed dress codes and beaches',
    },
    {
      title: 'Flip flops',
      description: 'Easy to wear, perfect for beach, pools',
    },
    {
      title: 'Socks',
      description: 'A must have thing to wear in your shoes',
    },
  ];

  const womenData = [
    {
      title: 'Boots',
      description: 'Lightweight leather boots for men',
    },
    {
      title: 'Sneakers',
      description: 'A go-to choice for athletic activities',
    },
    {
      title: 'Sandals',
      description: 'Perfect for relaxed dress codes and beaches',
    },
    {
      title: 'Heels',
      description: 'A must have thing to wear under your great dress',
    },
    {
      title: 'Flip flops',
      description: 'Easy to wear, perfect for beach, pools',
    },
    {
      title: 'Socks',
      description: 'A must have thing to wear in your shoes',
    },
  ];

  interface buyerUser {
    userName: string;
    buyerUserMenuOpened: boolean;
    setBuyerUserMenuOpened: Function
  }

  interface sellerUser {
    userName: string;
    sellerUserMenuOpened: boolean;
    setSellerUserMenuOpened: Function
  }

  function BuyerUser({ userName, buyerUserMenuOpened, setBuyerUserMenuOpened }:buyerUser) {
    const dispatch = useDispatch<AppDispatch>();
    return (
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setBuyerUserMenuOpened(false)}
        onOpen={() => setBuyerUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, { [classes.userActive]: buyerUserMenuOpened })}
          >
            <Group gap={7}>
              <Avatar src={avatar} alt={userName} radius="xl" size={20} />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {userName}
              </Text>
              <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconTruckDelivery
                style={{ width: rem(16), height: rem(16) }}
                color="#227619"
                stroke={1.5}
              />
            }
          >
            Orders
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconPackages
                style={{ width: rem(16), height: rem(16) }}
                color="#DB9406"
                stroke={1.5}
              />
            }
          >
            Manage Addresses
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            leftSection={
              <IconSettings color="blue" style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Account settings
          </Menu.Item>
          <Menu.Item
            onClick={() => dispatch(signOutUser())}
            leftSection={
              <IconLogout color="red" style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  function SellerUser({ userName, sellerUserMenuOpened, setSellerUserMenuOpened }:sellerUser) {
    const dispatch = useDispatch<AppDispatch>();
    return (
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setSellerUserMenuOpened(false)}
        onOpen={() => setSellerUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, { [classes.userActive]: sellerUserMenuOpened })}
          >
            <Group gap={7}>
              <Avatar src={avatar} alt={userName} radius="xl" size={20} />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {userName}
              </Text>
              <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconPackages
                style={{ width: rem(16), height: rem(16) }}
                color="#DB9406"
                stroke={1.5}
              />
            }
          >
            My Products
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconTruckDelivery
                style={{ width: rem(16), height: rem(16) }}
                color="#227619"
                stroke={1.5}
              />
            }
          >
            Orders
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            leftSection={
              <IconSettings color="blue" style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Account settings
          </Menu.Item>
          <Menu.Item
            onClick={() => dispatch(signOutUser())}
            leftSection={
              <IconLogout color="red" style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  export function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState('');

    const theme = useMantineTheme();
    const user:any = useSelector((state:RootState) => state.user);

    useEffect(() => {
      setIsLoggedIn(user.isLoggedIn);
      setUserType(user.data.type);
    }, [user]);

    const [buyerUserMenuOpened, setBuyerUserMenuOpened] = useState(false);
    const [sellerUserMenuOpened, setSellerUserMenuOpened] = useState(false);

    const menDataLinks = menData.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));

    const womenDataLinks = womenData.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));

    return (
      <Box bg="white" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Link to="/"><Image h={50} src={logo} /></Link>

            {userType === 'Seller' ?
            <>
              <Group h="100%" gap={8}>
                {isLoggedIn === true ?
                  <>
                    <SellerUser userName={user.data.name} sellerUserMenuOpened={sellerUserMenuOpened} setSellerUserMenuOpened={setSellerUserMenuOpened} />
                  </> :
                  <>
                    <Button variant="default" component={Link} to="/signin">Log in</Button>
                    <Button color="orange" component={Link} to="/signup">Sign up</Button>
                  </>
                }
              </Group>
            </> :
            <>
              <Group h="100%" gap={0}>
                <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                  <HoverCard.Target>
                    <a href="#" className={classes.link}>
                      <Center inline>
                        <Box component="span" mr={5}>
                          Men
                        </Box>
                        <IconChevronDown
                          style={{ width: rem(16), height: rem(16) }}
                          color={theme.colors.orange[6]}
                        />
                      </Center>
                    </a>
                  </HoverCard.Target>

                  <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                    <Group justify="space-between" px="md">
                      <Text fw={500}>Men</Text>
                      <Anchor href="#" fz="xs">
                        View all
                      </Anchor>
                    </Group>

                    <Divider my="sm" />

                    <SimpleGrid cols={2} spacing={0}>
                      {menDataLinks}
                    </SimpleGrid>
                  </HoverCard.Dropdown>
                </HoverCard>

                <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                  <HoverCard.Target>
                    <a href="#" className={classes.link}>
                      <Center inline>
                        <Box component="span" mr={5}>
                          Women
                        </Box>
                        <IconChevronDown
                          style={{ width: rem(16), height: rem(16) }}
                          color={theme.colors.orange[6]}
                        />
                      </Center>
                    </a>
                  </HoverCard.Target>

                  <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                    <Group justify="space-between" px="md">
                      <Text fw={500}>Women</Text>
                      <Anchor href="#" fz="xs">
                        View all
                      </Anchor>
                    </Group>

                    <Divider my="sm" />

                    <SimpleGrid cols={2} spacing={0}>
                      {womenDataLinks}
                    </SimpleGrid>
                  </HoverCard.Dropdown>
                </HoverCard>
                <a href="#" className={classes.link}>
                  Boys
                </a>
                <a href="#" className={classes.link}>
                  Girls
                </a>
              </Group>

              <Group h="100%" gap={8}>
                <Input
                  w={300}
                  className={classes.search}
                  placeholder="Search for products, brands and more"
                  leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                  visibleFrom="xs"
                />

                {isLoggedIn === true ?
                  <>
                    <BuyerUser userName={user.data.name} buyerUserMenuOpened={buyerUserMenuOpened} setBuyerUserMenuOpened={setBuyerUserMenuOpened} />
                    <Button variant="default" component={Link} to="/cart"><IconShoppingCart /> Cart</Button>
                  </> :
                  <>
                    <Button variant="default" component={Link} to="/signin">Log in</Button>
                    <Button color="orange" component={Link} to="/signup">Sign up</Button>
                  </>
                }
              </Group>
            </>
            }
          </Group>
        </header>
      </Box>
    );
  }
