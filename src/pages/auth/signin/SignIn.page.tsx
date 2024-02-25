import { Container, TextInput, Checkbox, Button, Group, Title, Text, PasswordInput, Paper, Anchor, Center, Image } from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../../store/slices/AuthSlice';
import classes from '../auth.module.css';
import logo from '../../../assets/logo/logo.png';
import { AppDispatch } from '../../../store/index';
import { SignInForm } from '../User';

const SignIn = () => {
    // const user = useSelector((state:RootState) => state.user);

    const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>();

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const handleSignIn: SubmitHandler<SignInForm> = (data) => {
        dispatch(signInUser(data))
        .then(result => {
            console.log(result.payload.user);
            navigate('/');
        });
    };

    return (
        <>
            <Center p={20}>
                <Container w={460}>
                    <Center pb={20}>
                        <Image radius="md" w={200} h={50} fit="contain" src={logo} />
                    </Center>
                    <Title ta="center" className={classes.title}>
                        Welcome back!
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Do not have an account yet?{' '}
                        <Anchor size="sm" component={Link} to="/signup">
                            Create account
                        </Anchor>
                    </Text>

                    <Paper shadow="lg" withBorder p={30} mt={30} radius="md">
                        <form onSubmit={handleSubmit(handleSignIn)}>
                            <TextInput size="sm" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} aria-invalid={errors.email ? 'true' : 'false'} label="Email" placeholder="Enter email" leftSection={<IconAt size={16} />} withAsterisk={false} />
                            {errors.email && <Text size="xs" c="red">Please enter a valid email</Text>}
                            <PasswordInput size="sm" {...register('password', { required: true })} label="Password" placeholder="Enter password" leftSection={<IconLock size={16} />} withAsterisk={false} mt="md" />
                            {errors.password && <Text size="xs" c="red">Please enter a valid password</Text>}
                            <Group justify="space-between" mt="lg">
                                <Checkbox label="Remember me" />
                                <Anchor component="button" size="sm">
                                    Forgot password?
                                </Anchor>
                            </Group>
                            <Button type="submit" fullWidth mt="xl">Sign in</Button>
                        </form>

                    </Paper>
                </Container>
            </Center>
        </>
    );
};

export default SignIn;
