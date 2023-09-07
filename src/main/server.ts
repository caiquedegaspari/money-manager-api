import 'module-alias/register'

const boostrap = async (): Promise<void> => {
  const app = (await import('./config/app')).default
  app.listen(4000, () => console.log('💸 Money Manager running at http://localhost:4000 💸'))
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
boostrap()
