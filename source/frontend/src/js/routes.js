import { DefaultPage } from './components/pages/default'
import { LoginPage } from './components/pages/login'
import { DailyPage } from "./components/pages/dailyPage"

export const routes = [
    {title: 'index', path: '', component: DefaultPage},
    {title: 'login', path: 'login', component: LoginPage},
    {title: 'daily', path: 'dailyPage', component: DailyPage}
]
