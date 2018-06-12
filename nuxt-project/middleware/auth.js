import Cookies from 'universal-cookie';

export default function({ req, redirect, route }) {
  if (!process.server || ['/login'].includes(route.path)) {
    return;
  }

  const cookies = new Cookies(req.headers.cookie);
  const credential = cookies.get('credential');

  if (credential) {
    console.log('credential', credential);
  } else {
    return redirect('/login');
  }
}
