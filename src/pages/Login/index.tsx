import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthAPI } from '../../api/login';
import { useAccessToken } from '../../store/token';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../utils';

const defaultTheme = createTheme();

export default function LoginPage() {

  const setAccessToken = useAccessToken(state => state.setAccessToken);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    //  ignorei implementações propositalmente das validações para este teste para focar meu tempo maior em desenvolvimento das funções mais importantes e relevantes para o teste.
    if(!email || !password) {
        alert(`Preencha todos os campos necessários para efetuar o login`);
        return;
    }

    try{
        const { accessToken } = await AuthAPI.login(email, password);
        setAccessToken(accessToken);
        navigate("/dashboard");
    } catch(err) {
        alert(getErrorMessage(err));
    }
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={`teste@elanto.com.br`}
              label="Email de acesso"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={`@Teste2023#Elanto`}
              name="password"
              label="Senha de acesso"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              Entrar
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}