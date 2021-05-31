import { DefaultPage } from './components/pages/default'
import { LoginPage } from './components/pages/login'
import { DailyPage } from "./components/pages/dailyPage"

export const routes = [
    {title: 'login', path: '', component: LoginPage},
    {title: "testing", path: 'test', component: DefaultPage},
    {title: 'daily', path: 'daily', component: DailyPage}
]
