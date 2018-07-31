export default function({ redirect, route }) {
  if (route.path == '/users/2') {
    redirect('/');
  }
}
