import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/integrations/supabase'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        // Login bem-sucedido - você pode redirecionar o usuário aqui
        console.log('Login realizado com sucesso!')
      }
    } catch (err) {
      setError('Erro inesperado ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  // const handleGoogleLogin = async () => {
  //   setLoading(true)
  //   setError(null)

  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: 'google',
  //       options: {
  //         redirectTo: `${window.location.origin}/dashboard`, // Ajuste conforme sua rota
  //       },
  //     })

  //     if (error) {
  //       setError(error.message)
  //     }
  //   } catch (err) {
  //     setError('Erro inesperado ao fazer login com Google')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Digite seu e-mail primeiro')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, // Ajuste conforme sua rota
      })

      if (error) {
        setError(error.message)
      } else {
        alert('E-mail de recuperação enviado! Verifique sua caixa de entrada.')
      }
    } catch (err) {
      setError('Erro ao enviar e-mail de recuperação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>
            Digite seu e-mail abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    disabled={loading}
                  >
                    Esqueceu sua senha?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Entrando...' : 'Login'}
                </Button>

                {/* <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  {loading ? 'Conectando...' : 'Entrar com o Google'}
                </Button> */}
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{' '}
              <a href="#" className="underline underline-offset-4">
                Inscreva-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
