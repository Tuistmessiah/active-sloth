import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { AppState } from 'src/data/redux/store';
import { login, resetIsLogging } from 'src/data/redux/reducers/user.reducer';
import { UsersApi } from 'src/data/api/users.api';

import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card';
import { Tabs, TabsContent } from 'src/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form';
import LoadingIcon from 'src/components/loading-icon/loading-icon.component';

import StyleUtils from 'src/utils/style.utils';
import style from './login.module.scss';
const s = StyleUtils.styleMixer(style);

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Email must be at least 2 characters.',
  }),
  password: z.string(),
});

const formSchemaSignup = z.object({
  email: z.string().min(2, {
    message: 'Email must be at least 2 characters.',
  }),
  password: z.string(),
  passwordConfirm: z.string(),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);
  const isLogging = useSelector((state: AppState) => state.user.isLogging);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/journal');
    }
  }, [isLoggedIn, navigate]);

  const formLogin = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'pedro@gmail.com',
      password: '12345678',
    },
  });

  const formSignup = useForm<z.infer<typeof formSchemaSignup>>({
    resolver: zodResolver(formSchemaSignup),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmitLogin(values: z.infer<typeof formSchema>) {
    dispatch(resetIsLogging(true));
    const res = await UsersApi.userLogin({ ...values, name: 'new Pedro' });
    dispatch(resetIsLogging(false));
    dispatch(login(res.data));
  }

  // TODO: To develop
  async function onSubmitSignup(values: z.infer<typeof formSchema>) {
    // const res = await UsersService.postApiV1UserSignup({ ...values, name: 'new Pedro' });
    // localStorage.setItem('token', res.token);
  }

  return (
    <div className={s('container')}>
      <Card className={s('card')}>
        <CardHeader>
          <CardTitle>Active Sloth</CardTitle>
          <CardDescription>Seize your day. One step at a time.</CardDescription>
        </CardHeader>
        <CardContent className={s('content')}>
          <Tabs defaultValue="account" className="w-[400px]">
            {/* <TabsList className="grid w-full grid-cols-2"> */}
            {/* <TabsTrigger value="account">Login</TabsTrigger> */}
            {/* <TabsTrigger value="password">Signup</TabsTrigger> */}
            {/* </TabsList> */}
            <TabsContent value="account">
              <Card>
                <CardHeader></CardHeader>
                <Form {...formLogin}>
                  <form onSubmit={formLogin.handleSubmit(onSubmitLogin)} className="space-y-8">
                    <CardContent className="space-y-1">
                      <FormField
                        control={formLogin.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formLogin.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button className={s('login-btn', { 'is-logging': isLogging })} type="submit">
                        {isLogging ? <LoadingIcon /> : <span>Login</span>}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader></CardHeader>

                <Form {...formSignup}>
                  <form onSubmit={formSignup.handleSubmit(onSubmitSignup)} className="space-y-8">
                    <CardContent className="space-y-1">
                      <FormField
                        control={formSignup.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formSignup.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formSignup.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Signup</Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
