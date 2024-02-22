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
  } from '@mantine/core';
  import { IconChevronDown, IconSearch } from '@tabler/icons-react';
  import { useDisclosure } from '@mantine/hooks';

    import classes from './Header.module.css';
  import logo from '../../assets/logo/logo.png';
import SignUpModal from '../Modals/SignUpModal';

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

  export function Header() {
    const theme = useMantineTheme();
    const [signUpModalOpened, { open, close }] = useDisclosure(false);

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
      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Image h={50} src={logo} />

            <Group h="100%" gap={0} visibleFrom="sm">
              <HoverCard width={600} position="bottom" radius="sm" shadow="md" withinPortal>
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

              <HoverCard width={600} position="bottom" radius="sm" shadow="md" withinPortal>
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

            <Group h="100%" gap={12} visibleFrom="sm">
              <Input
                w={300}
                className={classes.search}
                placeholder="Search for products, brands and more"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                visibleFrom="xs"
              />

              <Button variant="default" component="a" href="/signin">Log in</Button>
              <Button color="orange" component="a" href="/signup">Sign up</Button>
            </Group>

          </Group>
        </header>
      </Box>
    );
  }
