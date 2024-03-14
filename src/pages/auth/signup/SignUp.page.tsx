/* eslint-disable import/extensions */
/* eslint-disable max-len */
import { Container, TextInput, Button, Title, Text, PasswordInput, Paper, Anchor, Center, Image, Box, rem, Popover, Progress, NativeSelect } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { signUpUser } from '../../../store/slices/AuthSlice';
import classes from '../auth.module.css';
import logo from '../../../assets/logo/logo.png';
import { AppDispatch } from '../../../store/index';
import { SignUpForm } from '../../../types/User';
import { Header } from '@/components/header/Header';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
      <Text
        c={meets ? 'teal' : 'red'}
        style={{ display: 'flex', alignItems: 'center' }}
        mt={7}
        size="sm"
      >
        {meets ? (
          <IconCheck style={{ width: rem(14), height: rem(14) }} />
        ) : (
          <IconX style={{ width: rem(14), height: rem(14) }} />
        )}{' '}
        <Box ml={10}>{label}</Box>
      </Text>
    );
}

const passwordRequirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getPasswordStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    passwordRequirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (passwordRequirements.length + 1)) * multiplier, 10);
}

const SignUp = () => {
    // const user = useSelector((state:RootState) => state.user);

    const [passwordPopoverOpened, setPasswordPopoverOpened] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const passwordChecks = passwordRequirements.map((requirement, index) => (
            <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(passwordValue)} />
    ));
    const passwordStrength = getPasswordStrength(passwordValue);
    const color = passwordStrength === 100 ? 'teal' : passwordStrength > 50 ? 'yellow' : 'red';

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>();

    const dispatch = useDispatch<AppDispatch>();

    const handleSignUp: SubmitHandler<SignUpForm> = (data) => {
        dispatch(signUpUser(data));
    };

    return (
        <>
            <Header />
            <Center p={20} mt={50}>
                <Container w={460}>
                    <Center pb={20}>
                        <Image radius="md" w={200} h={50} fit="contain" src={logo} />
                    </Center>
                    <Title ta="center" className={classes.title}>
                        Welcome back!
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Already have an account?{' '}
                        <Anchor size="sm" component={Link} to="/signin">
                            Sign In
                        </Anchor>
                    </Text>

                    <Paper shadow="lg" withBorder p={30} mt={30} radius="md">
                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <TextInput size="sm" {...register('firstName', { required: true })} aria-invalid={errors.firstName ? 'true' : 'false'} label="Firstname" placeholder="Enter firstname" withAsterisk={false} />
                            {errors.firstName && <Text size="xs" c="red">Please enter first name</Text>}
                            <TextInput size="sm" {...register('lastName', { required: true })} aria-invalid={errors.lastName ? 'true' : 'false'} label="Lastname" placeholder="Enter lastname" withAsterisk={false} mt="md" />
                            {errors.lastName && <Text size="xs" c="red">Please enter last name</Text>}
                            <TextInput size="sm" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} aria-invalid={errors.email ? 'true' : 'false'} label="Email" placeholder="Enter email" withAsterisk={false} mt="md" />
                            {errors.email && <Text size="xs" c="red">Please enter a valid email</Text>}
                            <Popover opened={passwordPopoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
                            <Popover.Target>
                                <div onFocusCapture={() => setPasswordPopoverOpened(true)} onBlurCapture={() => setPasswordPopoverOpened(false)}>
                                    <PasswordInput size="sm" {...register('password', { required: true })} value={passwordValue} onChange={(event) => setPasswordValue(event.currentTarget.value)} label="Password" placeholder="Enter password" withAsterisk={false} mt="md" />
                                    {errors.password && <Text size="xs" c="red">Please enter a valid password</Text>}
                                </div>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Progress color={color} value={passwordStrength} size={5} mb="xs" />
                                <PasswordRequirement label="Includes at least 6 characters" meets={passwordValue.length > 5} />
                                {passwordChecks}
                            </Popover.Dropdown>
                            </Popover>

                            <NativeSelect
                              size="sm"
                              {...register('type', { required: true })}
                              aria-invalid={errors.type ? 'true' : 'false'}
                              label="Select account type"
                              data={['Buyer', 'Seller']}
                              defaultValue="Buyer"
                              withAsterisk={false}
                              mt="md"
                            />
                            {errors.type && <Text size="xs" c="red">Please select account type</Text>}

                            <Button size="sm" type="submit" fullWidth mt="xl">Sign up</Button>
                        </form>

                    </Paper>
                </Container>
            </Center>
        </>
    );
};

export default SignUp;
