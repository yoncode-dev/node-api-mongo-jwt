import app from './app';

app.listen(process.env.PORT_SERVER, () => {
  console.log(`Express server listening port ${process.env.PORT_SERVER}`);
});