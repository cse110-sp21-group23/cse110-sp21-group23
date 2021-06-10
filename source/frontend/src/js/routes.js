import { LoginPage } from './components/pages/login'
import { DailyPage } from "./components/pages/dailyPage"
import { WeeklyPage } from "./components/pages/weeklyPage"

/**
 * Routes page that holds all the page information
 * @class 
 * */
export const routes = [
    {title: 'login', path: '', component: LoginPage},
    {title: 'daily', path: 'daily', component: DailyPage},
    {title: 'weekly', path: 'weekly', component: WeeklyPage}
]
