import { DefaultPage } from './components/pages/default'
import { LoginPage } from './components/pages/login'

export const routes = [
    {title: 'index', path: '', component: DefaultPage},
    {title: 'login', path: 'login', component: LoginPage}
]