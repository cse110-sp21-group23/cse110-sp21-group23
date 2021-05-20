import { DefaultPage } from './components/pages/default'
import { LoginPage } from './components/pages/login'

export const routes = [
    {title: 'login', path: '', component: LoginPage},
    {title: 'login', path: 'login', component: LoginPage}
]